"use client"
import React, { FC, ReactNode, useCallback } from "react";
import classNames from "classnames";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [isMainContentOpen, setMainContentOpen] = React.useState(true);

  const toggleMainContent = useCallback(() => {
    setMainContentOpen((isOpen) => !isOpen);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((isOpen) => !isOpen);
  }, []);

  const mainContentClasses = classNames("flex-1 duration-500 ml-0", {
    "ml-0": !isSidebarOpen,
    "md:ml-14": !isMainContentOpen,
    "md:ml-56": isMainContentOpen,
  });

  return (
    <div className="relative min-h-screen flex w-full">
      <Sidebar
        open={isMainContentOpen}
        openSidebar={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleOpen={toggleMainContent}
      />
      <div className={mainContentClasses}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-3 sm:p-5 md:p-8 lg:p-10 ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
