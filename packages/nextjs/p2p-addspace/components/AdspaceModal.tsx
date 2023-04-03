import { useCallback, useEffect, useState } from "react";
import { Actions } from "./Actions";
import { Dialog } from "@headlessui/react";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type AdspaceModalProps = { open: boolean; onClose: (refetch?: boolean) => void };

export const AdspaceModal = ({ open, onClose }: AdspaceModalProps) => {
  const [url, setUrl] = useState<string>();
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [restrictions, setRestrictions] = useState<string>();

  const { writeAsync, isSuccess } = useScaffoldContractWrite({
    contractName: "AdspaceMarketplace",
    functionName: "publish",
    args: [url, `${width}:${height}`, restrictions],
  });

  const handleClose = useCallback(
    (refetch?: boolean) => {
      setUrl(undefined);
      setWidth(undefined);
      setHeight(undefined);
      setRestrictions(undefined);
      onClose(refetch);
    },
    [onClose],
  );

  useEffect(() => {
    if (isSuccess) {
      handleClose(true);
    }
  }, [isSuccess, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose} className="">
      <div className="absolute z-20 w-full h-full top-0 left-0 bg-black opacity-25" />
      <Dialog.Panel className="flex flex-col absolute z-[21] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-100 border-base-300 border shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4">
        <Dialog.Title>Place bid</Dialog.Title>
        {/* <Dialog.Description>This will permanently deactivate your account</Dialog.Description> */}

        <InputBase name="url" placeholder="url" value={url} onChange={setUrl} />
        <InputBase name="restrictions" placeholder="restrictions" value={restrictions} onChange={setRestrictions} />
        <div className="flex gap-4">
          <InputBase<number> type="number" name="width" placeholder="width" value={width} onChange={setWidth} />
          <InputBase<number> type="number" name="height" placeholder="height" value={height} onChange={setHeight} />
        </div>

        <Actions>
          <button className="btn btn-secondary btn-sm" onClick={() => handleClose()}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => writeAsync()}>
            Confirm
          </button>
        </Actions>
      </Dialog.Panel>
    </Dialog>
  );
};
