import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { getSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session = await getSession();
  if (session?.user?.token) {
    headers.set("authorization", `Bearer ${session.user.token}`);
  }
  return headers;
};
