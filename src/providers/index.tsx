"use client";
import { ReactNode } from "react";
import ReduxProvider from "./redux-provider";
import { ToastProvider } from "./toast-provider";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <ToastProvider />
        {children}
      </ReduxProvider>
    </SessionProvider>
  );
};

export default Providers;
