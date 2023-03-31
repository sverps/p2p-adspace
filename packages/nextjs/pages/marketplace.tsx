import type { NextPage } from "next";
import { ContentSpace } from "~~/p2p-addspace/components/ContentSpace";
import { Page } from "~~/p2p-addspace/components/Page";
import { Pane } from "~~/p2p-addspace/components/Pane";

const Marketplace: NextPage = () => {
  return (
    <Page>
      <Pane className="gap-0 divide-y divide-base-300">
        <ContentSpace data={{ dimensions: { x: 640, y: 480 }, url: "https://www.baseurl.com/", costPerClick: 4 }} />
        <ContentSpace data={{ dimensions: { x: 480, y: 640 }, url: "https://www.otherurl.com/", costPerClick: 3 }} />
      </Pane>
    </Page>
  );
};

export default Marketplace;
