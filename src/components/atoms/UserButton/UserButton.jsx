import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

import { toast } from 'sonner';

export const UserButton = () => {

    const navigate = useNavigate();

    const { auth, logout } = useAuth();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    function openWorkspaceCreateModal() {
        setOpenCreateWorkspaceModal(true);
    }

    async function handleLogout() {
        await logout();

        toast.success('Successfully signed out', {
            description: 'You have been logged out.',
            className: 'bg-green-100 border border-green-300 text-green-900',
            duration: 3000
        });

        navigate('/auth/signin');
    }

    return (
        <DropdownMenu>

            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-65 transition'>
                    <AvatarImage src={auth?.user?.avatar} />
                    <AvatarFallback>
                        {auth?.user?.username ? auth.user.username[0].toUpperCase() : 'U'}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>

                <DropdownMenuItem onClick={openWorkspaceCreateModal}>
                    <PencilIcon className='size-4 mr-2 h-10' />
                    Create Workspace
                </DropdownMenuItem>
                
                <DropdownMenuItem>
                    <SettingsIcon className='size-4 mr-2 h-10' />
                    Settings
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className='size-4 mr-2 h-10' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
};
