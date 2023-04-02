import { useState } from "react";
import type { NextPage } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { Adspace } from "~~/p2p-addspace/components/Adspace";
import { AdspaceModal } from "~~/p2p-addspace/components/AdspaceModal";
import { Page } from "~~/p2p-addspace/components/Page";
import { Pane } from "~~/p2p-addspace/components/Pane";
import { PlaceBidModal } from "~~/p2p-addspace/components/PlaceBidModal";
import { useAdspaces } from "~~/p2p-addspace/hooks/useAdspaces";

const Marketplace: NextPage = () => {
  const [adspaceModalOpen, setAdspaceModalOpen] = useState(false);
  const [contentSpaceIndex, setContentSpaceIndex] = useState<number>();
  const { data: adspaces, loading, refetch } = useAdspaces();

  if (loading) {
    return (
      <Page>
        <Spinner />
      </Page>
    );
  }

  return (
    <Page>
      <div className="w-full">
        <button className="btn btn-secondary bg-base-100" onClick={() => setAdspaceModalOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          new adspace
        </button>
      </div>
      <Pane className="gap-0 py-4 divide-y divide-base-300">
        {adspaces.length ? (
          adspaces.map(({ websiteUrl, dimensions, bidIndex }, index) => (
            <Adspace
              key={`${websiteUrl}-${index}-${bidIndex}`}
              data={{ index, dimensions, url: websiteUrl, bidIndex }}
              onInitiateBid={() => setContentSpaceIndex(index)}
            />
          ))
        ) : (
          <div className="flex flex-col gap-8">
            <span>No adspaces found.</span>
          </div>
        )}
      </Pane>
      <AdspaceModal
        open={adspaceModalOpen}
        onClose={(triggerRefetch?: boolean) => {
          if (triggerRefetch) {
            // TODO: refetch after tx has been mined
            refetch();
          }
          setAdspaceModalOpen(false);
        }}
      />
      <PlaceBidModal
        adspaceIndex={contentSpaceIndex}
        onClose={(triggerRefetch?: boolean) => {
          if (triggerRefetch) {
            // TODO: only refetch for current adspace
            // TODO: refetch after tx has been mined
            refetch();
          }
          setContentSpaceIndex(undefined);
        }}
      />
    </Page>
  );
};

export default Marketplace;
