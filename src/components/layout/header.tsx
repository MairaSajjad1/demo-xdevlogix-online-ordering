"use client"
import { FC, useState } from "react";
import { MenuIcon } from "@/assets/icons";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TbLogout2 as Logout } from "react-icons/tb";
import { Button } from "../ui/button";
import LogoutModal from "../modal/logout-modal";

interface HeaderProps {
  toggleSidebar: () => void;
  // Name: string;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showLogOutModal, setShowLogoutModal] = useState(false);

  const toggleLogoutModal = () => {
    setShowLogoutModal((showLogOutModal) => !showLogOutModal);
  };
  return (
    <>
      <div
        className={`
       bg-[#ffffff] sticky top-0 right-0 z-20 flex items-center justify-between  md:justify-end px-4  md:px-10 py-4`}
      >
        <div
          onClick={toggleSidebar}
          className="md:hidden cursor-pointer text-[#4f46e5] "
        >
          <MenuIcon />
        </div>
        <div className="flex items-center space-x-3 md:space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Image
                width={40}
                height={40}
                src={`/assets/images/avatar-profile.png`}
                alt="Avatar"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {/* <DropdownMenuLabel>{Name}</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              <Button
                onClick={toggleLogoutModal}
                className="w-full"
                variant={"destructive"}
              >
                <div className="mr-2">
                  <Logout size={20} />
                </div>
                Logout
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LogoutModal open={showLogOutModal} setOpen={toggleLogoutModal} />
    </>
  );
};

export default Header;
