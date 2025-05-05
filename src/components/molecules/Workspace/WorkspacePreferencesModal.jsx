import { TrashIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const WorkspacePreferencesModal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { initialValue, openPreferences, setOpenPreferences, workspace } = useWorkspacePreferencesModal();
  const [workspaceId, setWorkspaceId] = useState(null);
  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

  function handleClose() {
    setOpenPreferences(false);
  }

  useEffect(() => {
    setWorkspaceId(workspace?._id);
  }, [workspace]);

  async function handleDelete() {
    try {
      await deleteWorkspaceMutation();
      navigate('/home');
      queryClient.invalidateQueries({ queryKey: ['fetchWorkspaces'] });
      setOpenPreferences(false);
      toast.success('Workspace deleted successfully');
    } catch (error) {
      console.error('Error deleting workspace', error);
      toast.error('Error deleting workspace');
    }
  }

  return (
    <Dialog open={openPreferences} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue}</DialogTitle>
        </DialogHeader>

        <div className='px-4 pb-4 flex flex-col gap-y-2'>
          <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-sm'>Workspace Name</p>
              <p className='text-sm font-semibold hover:underline'>Edit</p>
            </div>
            <p className='text-sm'>{initialValue}</p>
          </div>

          <button
            onClick={handleDelete}
            className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'
          >
            <TrashIcon className='size-5' />
            <p className='text-sm font-semibold'>Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
