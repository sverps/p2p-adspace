//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

/**
 * A smart contract that website owners to publish their adspace 
 * and advertisers to bid on it.
 * So it creates a peer-to-peer marketplace for adspace.
 * @author Ben Dumoulin
 */
contract AdspaceMarketplace {

    uint256 public adspaceIndex = 0;
    uint256 public defaultAdDuration = 7 days;

    struct Adspace {
        address owner;
        string websiteUrl;
        string dimensions;
        string restrictions;
    }

    struct Bid {
        address bidder;
        uint256 bid;
        string ipfsAdCreative;
        string adDestinationUrl;
    }

    mapping(address => uint256) public userBalance;
    mapping(uint256 => Adspace) public adspaces;
    mapping(uint256 => Bid[]) public bids;
    mapping(uint256 => uint256) public activeBids;


    function getAdspaceIndex() public view returns (uint256) {
        return adspaceIndex;
    }

    function getAdspace(uint256 _adspaceIndex) public view returns (Adspace memory) {
        return adspaces[_adspaceIndex];
    }

    function getBids(uint256 _adspaceIndex) public view returns (Bid[] memory) {
        return bids[_adspaceIndex];
    }

    function topUpBlance() public payable {
        userBalance[msg.sender] += msg.value;
    }

    function withdrawBlance() public {
        uint256 amount = userBalance[msg.sender];
        userBalance[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function publish(
        string memory _websiteUrl, 
        string memory _dimensions, 
        string memory _restrictions
    ) public {
        adspaceIndex++;

        Adspace memory newAdspace = Adspace(msg.sender, _websiteUrl, _dimensions, _restrictions);
        adspaces[adspaceIndex] = newAdspace;
    }

    function bid(
        uint256 _adspaceIndex,
        uint256 _bid,
        string memory _ipfsAdCreative,
        string memory _adDestinationUrl
    ) public payable {
        require(_adspaceIndex <= adspaceIndex, "Adspace does not exist");

        Bid memory newBid = Bid(msg.sender, _bid, _ipfsAdCreative, _adDestinationUrl);
        bids[_adspaceIndex].push(newBid);
    }

    function acceptBid(uint256 _adspaceIndex, uint256 _bidIndex) public {
        require(_adspaceIndex <= adspaceIndex, "Adspace does not exist");
        require(_bidIndex <= bids[_adspaceIndex].length, "Bid does not exist");

        activeBids[_adspaceIndex] = _bidIndex;
    }

}
