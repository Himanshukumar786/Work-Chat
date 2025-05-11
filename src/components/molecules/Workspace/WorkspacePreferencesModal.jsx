import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useUpdateWorkspace } from '@/hooks/apis/workspaces/useUpdateWorkspace';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const WorkspacePreferencesModal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { initialValue, openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const [editOpen, setEditOpen] = useState(false);
  const [workspaceId, setWorkspaceId] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
  const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);

  useEffect(() => {
    if (workspace && workspace._id) {
      setWorkspaceId(workspace._id);
      setRenameValue(workspace.name || '');
    }
  }, [workspace]);

  const handleClose = () => setOpenPreferences(false);

  const handleDelete = async () => {
    try {
      await deleteWorkspaceMutation();
      queryClient.invalidateQueries({ queryKey: ['fetchWorkspaces'] });
      navigate('/home');
      setOpenPreferences(false);
      toast.success('Workspace deleted successfully');
    } catch (error) {
      console.error('Error deleting workspace', error);
      toast.error('Error deleting workspace');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWorkspaceMutation(renameValue);
      queryClient.invalidateQueries({ queryKey: [`fetchWorkspaceById-${workspaceId}`] });
      setOpenPreferences(false);
      toast.success('Workspace updated successfully');
    } catch (error) {
      console.error('Error updating workspace', error);
      toast.error('Error updating workspace');
    }
  };

  return (
    <Dialog open={openPreferences} onOpenChange={handleClose}>
      <DialogContent>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">Workspace Name</p>
                  <p className="text-sm font-semibold hover:underline">Edit</p>
                </div>
                <p className="text-sm">{initialValue}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Workspace</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <Input
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={50}
                  disabled={isPending}
                  placeholder="Workspace Name e.g. Design Team"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={isPending}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <button
            onClick={handleDelete}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
          >
            <TrashIcon className="size-5" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
