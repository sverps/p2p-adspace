import { minify } from "terser";

export async function generateSnippet({
  rpcUrl = "http://localhost:8545",
  chainId = 31337,
  contractAddress,
  adspaceIndex,
  minified = true,
}: {
  rpcUrl: string;
  contractAddress: string;
  chainId: number;
  adspaceIndex: number;
  minified?: boolean;
}) {
  const code = `const provider = new ethers.providers.JsonRpcProvider("${rpcUrl}", ${chainId});
  const adspaceContract = new ethers.Contract(
    "${contractAddress}",
    [
      "function bids(uint256 adspaceIndex, uint256 bidIndex) public view returns (address bidder, uint256 bid, string ipfsAdCreative, string adDestinationUrl, uint256 adDuration)",
      "function acceptedBids(uint256 adspaceIndex) public view returns (uint256, uint256, uint256)",
    ],
    provider,
  );
  function addProtocolIfMissing(url) {
    if (url.includes("://")) {
      return url;
    }
    return "https://" + url;
  }
  function sendEvent(bidIndex, type) {
    fetch("${window.location.origin}/api/analytics", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chainId: ${chainId},
        address: "${contractAddress}",
        type,
        adspaceIndex: ${adspaceIndex},
        bidIndex: bidIndex.toNumber(),
      }),
    })
  }
  (async function () {
    const innerATags = document.getElementById("${contractAddress}-${adspaceIndex}").getElementsByTagName('a');
    try {
      const [, bidIndex, adEndTimestamp] = (await adspaceContract.acceptedBids(ethers.BigNumber.from(${adspaceIndex}))) ?? [];
      if (adEndTimestamp.toNumber() * 1000 <= new Date().getTime()) {
        if (innerATags?.length) {
          document.getElementById("${contractAddress}-${adspaceIndex}").removeChild(
            innerATags[0]
          );
        }
        return;
      }
      const [, , ipfsAdCreative, adDestinationUrl] = (await adspaceContract.bids(${adspaceIndex}, bidIndex)) ?? [];
      const image = document.createElement("a");
      image.onclick = () => sendEvent(bidIndex, 1);
      image.onauxclick = (event) => {};
      let intersectionEventSent = false;
      const observer = new IntersectionObserver(([viewport]) => {
        if (!intersectionEventSent && viewport.isIntersecting) {
          sendEvent(bidIndex, 0)
          intersectionEventSent = true;
        }
      }, {
        threshold: 1.0,
      });
      observer.observe(image);
      image.href = addProtocolIfMissing(adDestinationUrl);
      image.target = "_blank";
      image.rel = "noreferrer";
      image.style = "position: absolute; background-image: url(https://ipfs.io/ipfs/" + ipfsAdCreative + ");" +
        "background-repeat: no-repeat; background-position: center; background-siize: cover; width: 100%; height: 100%;";
      document.getElementById("${contractAddress}-${adspaceIndex}")
        .prepend(image);
    } catch (e) {
      if (innerATags?.length) {
        document.getElementById("${contractAddress}-${adspaceIndex}").removeChild(
          innerATags[0]
        );
      }
      console.warn(e);
    }
  })();`;

  return `
  <!-- Start of ad --><div id="${contractAddress}-${adspaceIndex}" style="position: relative; width: 640px; height: 480px;">
    <div
      style="flex: 1; height: 100%; display: flex; align-items: center; justify-content: center; gap: 4px; box-sizing: border-box; border: solid 1px  #666;">
      <span>No ad running.</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </div>
    <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
    <script>${minified ? (await minify(code)).code : code}</script>
  </div>
  <!-- End of ad -->
  `;
}
