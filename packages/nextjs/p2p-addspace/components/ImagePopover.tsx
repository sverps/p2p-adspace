/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";

type ImagePopoverProps = { label?: string; url: string };

export const ImagePopover = ({ label, url }: ImagePopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex"
      >
        <span>{label ?? url}</span>
        <PhotoIcon className="w-5 h-5 ml-2" />
      </a>
      <Transition
        className="absolute p-1 bottom-6 left-1/2 -translate-x-1/2 bg-neutral-content drop-shadow-md rounded min-w-[200px]"
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
