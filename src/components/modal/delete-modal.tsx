import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BiLoaderAlt as Loader, BiTrashAlt as Trash } from "react-icons/bi";

interface DeleteModalProps {
  open: boolean;
  setOpen: () => void;
  loading: boolean;
  confirmDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  setOpen,
  loading,
  confirmDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are your sure?</DialogTitle>
          <DialogDescription>
            Please, rethink about your decision because you will not be able to
            undo this .
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <Button disabled={loading} onClick={setOpen} variant={"outline"}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={confirmDelete}
            variant={"destructive"}
          >
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 w-4 h-4" />
            )}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
