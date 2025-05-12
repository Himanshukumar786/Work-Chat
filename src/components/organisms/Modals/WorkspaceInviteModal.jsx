import { CopyIcon, RefreshCcwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner'; // ✅ using Sonner
import { useResetJoinCode } from '@/hooks/apis/workspaces/useResetJoinCode'; // Assuming this import is needed

export const WorkspaceInviteModal = ({
    openInviteModal,
    setOpenInviteModal,
    workspaceName,
    joinCode,
    workspaceId,
}) => {
    const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);

    async function handleCopy() {
        const inviteLink = `${joinCode}`;
        await navigator.clipboard.writeText(inviteLink);
        toast.success('Link copied to clipboard'); // ✅ Sonner toast
    }

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
            toast.success('Join code reset successfully'); // ✅ Sonner toast
        } catch (error) {
            console.log('Error in resetting join code', error);
            toast.error('Failed to reset join code'); // optional: show error feedback
        }
    }

    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use the code shown below to invite people to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                    <p className="font-bold text-4xl uppercase">{joinCode}</p>
                    <Button size="sm" variant="ghost" onClick={handleCopy}>
                        Copy Link
                        <CopyIcon className="size-4 ml-2" />
                    </Button>

                    {/* Link to redirect the user in a new tab to the join page */}
                    <a
                        href={`/workspaces/join/${workspaceId}`}
                        target="_blank"
                        rel="noreferrer"
                        className='text-blue-500'
                    >
                        Redirect to join page
                    </a>
                    
                </div>

                <div className="flex items-center justify-center w-full">
                    <Button variant="outline" onClick={handleResetCode}>
                        Reset Join Code
                        <RefreshCcwIcon className="size-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
