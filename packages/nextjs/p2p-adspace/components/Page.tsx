import { ReactNode } from "react";

export const Page = ({
  children,
  "data-theme": theme,
}: {
  children: ReactNode | ReactNode[];
  "data-theme"?: string;
}) => {
  return (
    <div
      className="flex flex-col self-center items-center justify-center w-full max-w-3xl px-3 py-8 gap-6"
      data-theme={theme}
    >
      {children}
    </div>
  );
};
