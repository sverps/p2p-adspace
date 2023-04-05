/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Transition } from "@headlessui/react";

type ImagePopoverProps = { url: string };

export const ImagePopover = ({ url }: ImagePopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {url}
      </a>
      <Transition
        className="absolute p-1 bottom-6 left-1/2 -translate-x-1/2 bg-neutral-content drop-shadow-md rounded"
        show={open}
        enter="transition-opacity duration-250" // TODO: add height transition
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <img src={url} onClick={() => setOpen(false)} alt={url} width="300px" height="300px" />
      </Transition>
    </div>
  );
};

// <Dialog open={open} onClose={() => undefined}>
//   {/* <div className="absolute z-20 w-full h-full top-0 left-0 bg-black opacity-25" /> */}
//   <Dialog.Panel className="flex flex-col absolute z-[21] top-20 left-1/2 -translate-x-1/2 bg-base-100 border-base-300 border shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4">
//     <img src={url} onClick={() => setOpen(false)} alt={url} width="300px" height="300px" />
//   </Dialog.Panel>
// </Dialog>
