import { Dialog } from "@headlessui/react";

type PlaceBidModalProps = { contentSpaceIndex?: number; onClose: () => void };

export const PlaceBidModal = ({ contentSpaceIndex, onClose }: PlaceBidModalProps) => {
  return (
    <Dialog open={typeof contentSpaceIndex === "number"} onClose={onClose} className="">
      <div className="absolute z-20 w-full h-full top-0 left-0 bg-black opacity-25" />
      <Dialog.Panel className="absolute z-[21] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-100 border-base-300 border shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4">
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>This will permanently deactivate your account</Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data will be permanently removed. This action
          cannot be undone.
        </p>

        <button onClick={onClose}>Deactivate</button>
        <button onClick={onClose}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
};
