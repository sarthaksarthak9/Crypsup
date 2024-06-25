// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract NNFFTT is ERC721, ERC721Enumerable, Ownable {
    uint256 private _nextTokenId;
    uint256 public mintRate = 0.001 ether;
    uint public MAX_SUPPLY = 1000;
    constructor(
        address initialOwner
    ) ERC721("NNFFTT", "YYRR") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://api.mynnfftt.com/tokens/";
    }

    function safeMint(address to) public payable {
        require(totalSupply() < MAX_SUPPLY, "Can't mint more.");
        require(msg.value >= mintRate, "Not enough ether sent");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}