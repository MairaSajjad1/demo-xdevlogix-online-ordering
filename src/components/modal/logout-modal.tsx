import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface LogoutModalProps {
  open: boolean;
  setOpen: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ open, setOpen }) => {
  const handleLogOut =  () => {
     signOut({ callbackUrl: 'http://localhost:3000/' });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#4741E1]">
            You are attempting to log out from Admin Panel.
          </DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
          <div className="flex items-center justify-end gap-4">
            <Button variant={"outline"} onClick={setOpen}>
              NO
            </Button>
            <Button
              type="button"
              onClick={handleLogOut}
              variant={"destructive"}
            >
              YES
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
