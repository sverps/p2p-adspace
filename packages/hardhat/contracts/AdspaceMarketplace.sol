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
    uint256 bidIndex;
  }

  struct Bid {
    address bidder;
    uint256 bid;
    string ipfsAdCreative;
    string adDestinationUrl;
    uint256 adDuration;
  }

  struct acceptedBid {
    uint256 adspaceIndex;
    uint256 bidIndex;
    uint256 adEndTimestamp;
  }

  mapping(address => uint256) public userBalance;
  mapping(uint256 => Adspace) public adspaces;
  mapping(uint256 => mapping(uint256 => Bid)) public bids; // adspaceIndex => bidIndex => Bid
  mapping(uint256 => acceptedBid) public acceptedBids;

  function getAdspaceIndex() public view returns (uint256) {
    return adspaceIndex;
  }

  function getAdspaceFromIndex(uint256 _adspaceIndex) public view returns (Adspace memory) {
    return adspaces[_adspaceIndex];
  }

  function topUpBlance() public payable {
    userBalance[msg.sender] += msg.value;
  }

  function withdrawBlance() public {
    uint256 amount = userBalance[msg.sender];
    userBalance[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
  }

  // Publish an Adspace
  function publish(string memory _websiteUrl, string memory _dimensions, string memory _restrictions) public {
    Adspace memory newAdspace = Adspace(msg.sender, _websiteUrl, _dimensions, _restrictions, 0);
    adspaces[adspaceIndex] = newAdspace;
    adspaceIndex++;
  }

  // Bid on an Adspace
  function bid(
    uint256 _adspaceIndex,
    uint256 _bid,
    string memory _ipfsAdCreative,
    string memory _adDestinationUrl,
    uint256 _adDuration
  ) public payable {
    require(_adspaceIndex <= adspaceIndex, "Adspace does not exist");
    require(msg.value + userBalance[msg.sender] >= _bid, "msg.value plus available balance is lower than bid amount");

    topUpBlance();

    uint256 bidIndex = adspaces[_adspaceIndex].bidIndex;

    Bid memory newBid = Bid(
      msg.sender,
      _bid,
      _ipfsAdCreative,
      _adDestinationUrl,
      _adDuration == 0 ? defaultAdDuration : _adDuration
    );
    bids[_adspaceIndex][bidIndex] = newBid;

    adspaces[_adspaceIndex].bidIndex++;
  }

  // Chose which bid to accept on an Adspace
  function acceptBid(uint256 _adspaceIndex, uint256 _bidIndex) public {
    require(_adspaceIndex <= adspaceIndex, "Adspace does not exist");
    require(_bidIndex <= adspaces[_adspaceIndex].bidIndex, "Bid does not exist");

    address bidder = bids[_adspaceIndex][_bidIndex].bidder;
    address owner = adspaces[_adspaceIndex].owner;

    require(msg.sender == owner, "Only the owner can accept a bid");
    require(userBalance[bidder] >= bids[_adspaceIndex][_bidIndex].bid, "Bidder does not have enough balance");

    userBalance[bidder] -= bids[_adspaceIndex][_bidIndex].bid;
    userBalance[owner] += bids[_adspaceIndex][_bidIndex].bid;

    acceptedBid memory newAcceptedBid = acceptedBid(
      _adspaceIndex,
      _bidIndex,
      block.timestamp + bids[_adspaceIndex][_bidIndex].adDuration
    );

    acceptedBids[_adspaceIndex] = newAcceptedBid;
  }

  function activeCreative(
    uint256 _adspaceIndex
  ) public view returns (string memory ipfsHash, string memory adDestination) {
    acceptedBid memory ab = acceptedBids[_adspaceIndex];
    if (ab.adEndTimestamp == 0x0) {
      return ("", "");
    } else {
      return (bids[_adspaceIndex][ab.bidIndex].ipfsAdCreative, bids[_adspaceIndex][ab.bidIndex].adDestinationUrl);
    }
  }

  function stopAd(uint256 _adspaceIndex) public {
    require(_adspaceIndex <= adspaceIndex, "Adspace does not exist");

    address owner = adspaces[_adspaceIndex].owner;
    require(msg.sender == owner, "Only the owner can stop an ad");

    acceptedBid memory activeAcceptedBid = acceptedBids[_adspaceIndex];

    require(block.timestamp > activeAcceptedBid.adEndTimestamp, "Ad has not ended yet");

    delete acceptedBids[_adspaceIndex];
  }

  receive() external payable {
    topUpBlance();
  }
}
