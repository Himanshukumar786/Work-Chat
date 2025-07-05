import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'; // Assumed to exist
import { useConfirm } from '@/hooks/useConfirm'; // Adjust path if needed

export const ChannelHeader = ({ name: initialName }) => {
  const [name, setName] = useState(initialName);
  const [isEditOpen, setEditOpen] = useState(false);
  const [newName, setNewName] = useState(name);

  const { ConfirmDialog, confirmation } = useConfirm({
    title: 'Delete Channel',
    message: `Are you sure you want to delete the channel "${name}"? This action cannot be undone.`,
  });

  const handleSave = () => {
    setName(newName);
    setEditOpen(false);
    toast.success('Channel name updated');
  };

  const handleDelete = async () => {
    const ok = await confirmation();
    if (ok) {
      // Perform delete logic here
      toast.success(`Channel "${name}" deleted`);
    }
  };

  return (
    <div className="bg-white border-b h-12 flex items-center px-4 overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 w-auto overflow-hidden"
          >
            <span># {name} </span>
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <div
              className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setNewName(name);
                setEditOpen(true);
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Channel name</p>
                <p className="text-sm font-semibold text-blue-600">Edit</p>
              </div>
              <p className="text-sm">{name}</p>
            </div>

            <div
              className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-red-100"
              onClick={handleDelete}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-red-600">
                  Delete Channel
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Channel Name Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Channel Name</DialogTitle>
            <DialogDescription>
              Update the name of your channel.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Channel name"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog />
    </div>
  );
};
