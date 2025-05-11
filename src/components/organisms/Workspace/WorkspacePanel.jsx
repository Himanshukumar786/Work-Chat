import { AlertTriangleIcon, Loader, MessageSquareTextIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { WorkspacePanelHeader } from '@/components/molecules/Workspace/WorkspacePanelHeader';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { SideBarItem } from '@/components/atoms/SideBarItem/SideBarItem';

export const WorkspacePanel = () => {
    const { workspaceId } = useParams();

    const { workspace, isFetching, isSuccess, error } = useGetWorkspaceById(workspaceId);

    if (isFetching) {
        return (
            <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                <Loader className='animate-spin size-6 text-white' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                <AlertTriangleIcon className='size-6 text-white' />
                <p>Failed to load workspace: {error.message}</p>
            </div>
        );
    }

    if (!isSuccess || !workspace) {
        return (
            <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                <AlertTriangleIcon className='size-6 text-white' />
                <p>Workspace not found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#a471ac] text-white">
            <WorkspacePanelHeader workspace={workspace} />

            <div
                className='flex flex-col px-2 mt-3'
            >
                <SideBarItem 
                    label="Threads"
                    icon={MessageSquareTextIcon}
                    id="threads"
                    variant='active'
                />
            </div>

        </div>
    );
};