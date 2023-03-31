import { ReactNode } from "react";

export const Page = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className="flex flex-col self-center w-full max-w-3xl py-8 gap-6">{children}</div>;
};
