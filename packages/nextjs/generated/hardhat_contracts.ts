export default {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        AdspaceMarketplace: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_bidIndex",
                  type: "uint256",
                },
              ],
              name: "acceptBid",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "acceptedBids",
              outputs: [
                {
                  internalType: "uint256",
                  name: "adspaceIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bidIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "adEndTimestamp",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
              ],
              name: "activeCreative",
              outputs: [
                {
                  internalType: "string",
                  name: "ipfsHash",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "adDestination",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "adspaceIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "adspaces",
              outputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "websiteUrl",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "dimensions",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "restrictions",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "bidIndex",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_bid",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_ipfsAdCreative",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_adDestinationUrl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_adDuration",
                  type: "uint256",
                },
              ],
              name: "bid",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "bids",
              outputs: [
                {
                  internalType: "address",
                  name: "bidder",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "bid",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "ipfsAdCreative",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "adDestinationUrl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "adDuration",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "defaultAdDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
              ],
              name: "getAdspaceFromIndex",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "websiteUrl",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "dimensions",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "restrictions",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "bidIndex",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct AdspaceMarketplace.Adspace",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAdspaceIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_websiteUrl",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_dimensions",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_restrictions",
                  type: "string",
                },
              ],
              name: "publish",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
              ],
              name: "stopAd",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "topUpBlance",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawBlance",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        AdspaceMarketplace: {
          address: "0xCBe18BC3773C570F83aEA16591583a20BC65b2a9",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_bidIndex",
                  type: "uint256",
                },
              ],
              name: "acceptBid",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "acceptedBids",
              outputs: [
                {
                  internalType: "uint256",
                  name: "adspaceIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bidIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "adEndTimestamp",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
              ],
              name: "activeCreative",
              outputs: [
                {
                  internalType: "string",
                  name: "ipfsHash",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "adDestination",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "adspaceIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "adspaces",
              outputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "websiteUrl",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "dimensions",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "restrictions",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "bidIndex",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_bid",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_ipfsAdCreative",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_adDestinationUrl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_adDuration",
                  type: "uint256",
                },
              ],
              name: "bid",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "bids",
              outputs: [
                {
                  internalType: "address",
                  name: "bidder",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "bid",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "ipfsAdCreative",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "adDestinationUrl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "adDuration",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "defaultAdDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
              ],
              name: "getAdspaceFromIndex",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "websiteUrl",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "dimensions",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "restrictions",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "bidIndex",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct AdspaceMarketplace.Adspace",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getAdspaceIndex",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_websiteUrl",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_dimensions",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_restrictions",
                  type: "string",
                },
              ],
              name: "publish",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_adspaceIndex",
                  type: "uint256",
                },
              ],
              name: "stopAd",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "topUpBlance",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "userBalance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawBlance",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
      },
    },
  ],
} as const;
