import { useCallback, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { AdspaceModal } from "~~/p2p-addspace/components/AdspaceModal";
import { AdspaceView } from "~~/p2p-addspace/components/AdspaceView";
import { Page } from "~~/p2p-addspace/components/Page";
import { Pane } from "~~/p2p-addspace/components/Pane";
import { PlaceBidModal } from "~~/p2p-addspace/components/PlaceBidModal";
import { useAdspaces } from "~~/p2p-addspace/hooks/useAdspaces";

const Marketplace: NextPage = () => {
  const [adspaceModalOpen, setAdspaceModalOpen] = useState(false);
  const [adspaceIndex, setAdspaceIndex] = useState<number>();
  const { data: adspaces, loading, refetch } = useAdspaces();

  const handleCloseAdspaceModal = useCallback(
    (triggerRefetch?: boolean) => {
      if (triggerRefetch) {
        refetch();
      }
      setAdspaceModalOpen(false);
    },
    [refetch],
  );

  const handleClosePlaceBidModal = useCallback(
    (triggerRefetch?: boolean) => {
      if (triggerRefetch) {
        // TODO: only refetch for current adspace
        refetch();
      }
      setAdspaceIndex(undefined);
    },
    [refetch],
  );

  return (
    <Page>
      <Head>
        <title>Adspace marketplace</title>
        <meta name="description" content="Create and bit on adspaces" />
      </Head>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full">
            <button className="btn btn-secondary bg-base-100" onClick={() => setAdspaceModalOpen(true)}>
              <PlusIcon className="h-4 w-4" />
              new adspace
            </button>
          </div>
          <Pane className="gap-0 py-4 divide-y divide-base-300">
            {adspaces.length ? (
              adspaces.map(adspace => (
                <AdspaceView
                  key={`${adspace.websiteUrl}-${adspace.index}-${adspace.bidIndex}`}
                  adspace={adspace}
                  onInitiateBid={() => setAdspaceIndex(adspace.index)}
                />
              ))
            ) : (
              <div className="flex flex-col gap-8">
                <span>No adspaces found.</span>
              </div>
            )}
          </Pane>
          <AdspaceModal open={adspaceModalOpen} onClose={handleCloseAdspaceModal} />
          <PlaceBidModal adspaceIndex={adspaceIndex} onClose={handleClosePlaceBidModal} />
        </>
      )}
    </Page>
  );
};

export default Marketplace;
