/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

type AdDisplayProps = {
  adIndex: number;
  rpcUrl: string;
  chainId: number;
};

export const AdDisplay = ({ adIndex, rpcUrl, chainId }: AdDisplayProps) => {
  const [acceptedBid, setAcceptedBid] = useState<{ hash: string; url: string }>();
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
    const adspaceContract = new ethers.Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      [
        "function bids(uint256 adspaceIndex, uint256 bidIndex) public view returns (address bidder, uint256 bid, string ipfsAdCreative, string adDestinationUrl, uint256 adDuration)",
        "function acceptedBids(uint256 adspaceIndex) public view returns (uint256, uint256, uint256)",
      ],
      provider,
    );

    function addProtocolIfMissing(url: string) {
      if (url.includes("://")) {
        return url;
      }
      return `https://${url}`;
    }

    (async function () {
      const [, bidIndex, adEndTimestamp] = (await adspaceContract.acceptedBids(BigNumber.from(adIndex))) ?? [];
      if ((adEndTimestamp as BigNumber).toNumber() * 1000 <= new Date().getTime()) {
        setAcceptedBid(undefined);
        return;
      }
      const [, , ipfsAdCreative, adDestinationUrl] = (await adspaceContract.bids(adIndex, bidIndex)) ?? [];
      setAcceptedBid({ hash: ipfsAdCreative, url: addProtocolIfMissing(adDestinationUrl) });
    })();
  }, [adIndex, chainId, rpcUrl]);

  return (
    <div
      style={{
        width: 640,
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #666",
      }}
    >
      {acceptedBid ? (
        <a
          href={acceptedBid.url}
          target="_blank"
          rel="noreferrer"
          style={{
            backgroundImage: `url(https://ipfs.io/ipfs/${acceptedBid.hash})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          No ad running.
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
