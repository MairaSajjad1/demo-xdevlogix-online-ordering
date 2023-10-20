// import { FC, ReactNode, useCallback, useState } from "react";
// import classNames from "classnames";
// import Sidebar from "./sidebar";
// import Header from "./header";

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: FC<LayoutProps> = ({ children }) => {
//   const [openSidebar, setOpenSidebar] = useState(false);

//   const [open, setOpen] = useState(true);

//   const mainContentClassName = classNames("flex-1 duration-300 ml-0 md:ml-56", {
//     "ml-0": !openSidebar,
//     "md:ml-56": openSidebar,
//   });

//   const toggleOpen = useCallback(() => {
//     setOpen((open) => !open);
//   }, []);

//   const toggleSidebar = useCallback(() => {
//     setOpenSidebar((openSidebar) => !openSidebar);
//   }, []);

//   return (
//     <div className="relative min-h-screen flex w-full">
//       <Sidebar
//         openSidebar={openSidebar}
//         toggleSidebar={toggleSidebar}
//         toggleOpen={toggleOpen}
//       />
//       <div className={mainContentClassName}>
//         <Header toggleSidebar={toggleSidebar} />
//         {/* <div className="p-3 sm:p-5 md:p-8 lg:p-10 ">{children}</div> */}
//       </div>
//     </div>
//   );
// };

// export default Layout;
