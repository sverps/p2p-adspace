import { BigNumber, ethers } from "ethers";

export type Adspace = { owner: string; adspaceIndex: number };
export type Bid = { bidder: string; adspaceIndex: number; bidIndex: number };

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545", 31337);
const adspaceContract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  [
    "function adspaceIndex() public view returns (uint256 adspaceIndex)",
    "function adspaces(uint256 adspaceIndex) public view returns (address owner, string websiteUrl, string dimensions, string restrictions, uint256 bidIndex)",
    "function bids(uint256 adspaceIndex, uint256 bidIndex) public view returns (address bidder, uint256 bid, string ipfsAdCreative, string adDestinationUrl, uint256 adDuration)",
    "function acceptedBids(uint256 adspaceIndex) public view returns (uint256, uint256, uint256)",
  ],
  provider,
);

export async function getAdspacesAndBids(address?: string) {
  const adspaceIndex = await adspaceContract.adspaceIndex();
  const adspaces = await Promise.all(
    Array.from({ length: (adspaceIndex as BigNumber).toNumber() }).map(async (_, index) => {
      const { bidIndex, ...adspace } = await getAdspace(index);
      const bids = await getBids(index, bidIndex);
      return { ...adspace, bids };
    }),
  );
  const { allAdspaces, allBids } = adspaces.reduce(
    ({ allAdspaces, allBids }, { bids, ...adspace }) => {
      return { allAdspaces: [...allAdspaces, adspace], allBids: [...allBids, ...bids] };
    },
    { allAdspaces: [] as Adspace[], allBids: [] as Bid[] },
  );
  return {
    adspaces: address ? allAdspaces.filter(({ owner }) => owner === address) : allAdspaces,
    bids: address ? allBids.filter(({ bidder }) => bidder === address) : allBids,
  };
}

export async function getAdspace(adspaceIndex: number) {
  const [owner, , , , bidIndex] = (await adspaceContract.adspaces(ethers.BigNumber.from(adspaceIndex))) ?? [];
  return { owner, adspaceIndex, bidIndex: (bidIndex as BigNumber).toNumber() } as Adspace & { bidIndex: number };
}

export async function getBids(adspaceIndex: number, bidIndex: number) {
  return await Promise.all(Array.from({ length: bidIndex }).map((_, index) => getBid(adspaceIndex, index)));
}

export async function getBid(adspaceIndex: number, bidIndex: number) {
  const [bidder] =
    (await adspaceContract.bids(ethers.BigNumber.from(adspaceIndex), ethers.BigNumber.from(bidIndex))) ?? [];
  return { bidder, adspaceIndex, bidIndex };
}
