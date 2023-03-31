import { ReactNode } from "react";

export const Pane = ({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <div className={`flex flex-col items-start`}>
      {title && (
        <div className="h-[5rem] px-5 bg-base-300 rounded-[22px] top-0 left-0 py-[0.65rem] shadow-lg shadow-base-300">
          <p className="my-0 text-sm">{title}</p>
        </div>
      )}
      <div
        className={`flex-1 flex flex-col w-full h-full bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4 ${
          title ? "-mt-[38px]" : ""
        } ${className ? className : ""}`}
      >
        {children}
      </div>
    </div>
  );
};
