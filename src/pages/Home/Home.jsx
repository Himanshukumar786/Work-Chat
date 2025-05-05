import { useEffect } from 'react';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useNavigate } from 'react-router-dom';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

export const Home = () => {
    const { isFetching, workspaces } = useFetchWorkspace();
    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();
    const navigate = useNavigate();

    useEffect(() => {
        if (isFetching) return;

        console.log('Workspaces downloaded:', workspaces);

        if (Array.isArray(workspaces) && workspaces.length > 0) {
            const firstWorkspaceId = workspaces[0]._id;
            console.log('Redirecting to workspace:', firstWorkspaceId);
            setOpenCreateWorkspaceModal(true);
            navigate(`/workspaces/${firstWorkspaceId}`);
        } else if (workspaces === undefined) {
            console.error('Failed to fetch workspaces. Please try again.');
        } else {
            console.log('No workspaces found, consider creating one.');
        }
    }, [isFetching, workspaces, navigate]);

    return (
        <>
            <h1>Home</h1>
            <UserButton />
        </>
    );
};