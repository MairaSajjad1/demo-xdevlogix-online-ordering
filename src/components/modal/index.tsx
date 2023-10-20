import { FC, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface ModalProps {
  title: string;
  open: boolean;
  setOpen: () => void;
  body: ReactNode;
}

const Modal: FC<ModalProps> = ({ title, open, setOpen, body }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#4741E1]">{title}</DialogTitle>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
