pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {IBondNftMint, IBondNftLegal, bondDetails} from "./IBondNft.sol";

contract BondNft is
    ERC721URIStorage,
    Ownable,
    Pausable,
    IBondNftMint,
    IBondNftLegal
{
    using EnumerableSet for EnumerableSet.AddressSet;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // all the tokens hold by the owner
    mapping(address => uint256[]) bonds;

    EnumerableSet.AddressSet internal legalMembers;

    //Hashed doc
    mapping(uint256 => string) internal verifiedDocumentHash;

    uint256[] internal verifiedBonds;

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {
        legalMembers.add(_msgSender());
    }

    function canTransfer() external view returns (bool _status) {
        return (!paused() || _msgSender() == owner());
    }

    //Implemented hook that ovverides the function to make it nontransferable until desired
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal view override {
        if (paused()) {
            require(
                _msgSender() == owner(),
                "Only the Owner can Transfer or Mint until pause"
            );
        }
    }

    // if a contract is paused only owner() can transfer
    function pause() public onlyOwner {
        _pause();
    }

    //if a contract is unpaused any one having minter role can mint
    //Transferable if unpaused
    function unPause() public onlyOwner {
        _unpause();
    }

    function isLegalMember(address legalMember_)
        internal
        view
        returns (bool role_)
    {
        return legalMembers.contains(legalMember_);
    }

    // add a Legal member address can be done only from owner
    function addLegalRole(address legalMember_) public onlyOwner {
        if (!legalMembers.contains(legalMember_)) {
            legalMembers.add(legalMember_);
        }
    }

    // remove a Legal memeber address can be done only from owner
    function removeLegalRole(address legalMember_) public onlyOwner {
        require(legalMembers.contains(legalMember_));
        legalMembers.remove(legalMember_);
    }

    function mintABond(address to_, string memory storageUri_)
        external
        override
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newBond = _tokenIds.current();
        _safeMint(to_, newBond);
        _setTokenURI(newBond, storageUri_);
        bonds[to_].push(newBond);
        return newBond;
    }

    function updateABond(
        uint256 id_,
        string memory hashedDoc_,
        string memory storageUri_
    ) external override returns (bool) {
        require(isLegalMember(_msgSender()), "Not a legal member");
        require(id_ < _tokenIds.current(), "Not a valid nft");
        verifiedDocumentHash[id_] = hashedDoc_;
        verifiedBonds[id_];
        _setTokenURI(id_,storageUri_);
        return true;
    }

    function verifyBond(uint256 id_, string memory hashedDoc_)
        external
        override
        view
        returns (bool)
    {
        string memory docHash = verifiedDocumentHash[id_];
        require(
            keccak256(abi.encodePacked(docHash)) ==
                keccak256(abi.encodePacked(hashedDoc_)),
            "Invalid doc"
        );
        return true;
    }


    function getAllBonds(uint256 start_, uint8 bondCount_)
        external
        override
        view
        returns (bondDetails[] memory)
    {
        bondDetails[] memory storageUris = new bondDetails[](bondCount_);
        require(start_ < _tokenIds.current(), "Not a valid nft");
        uint256 indexOfStorage = 0;
        for (uint256 index = start_; index < start_ + bondCount_; index++) {
            require(index < _tokenIds.current(), "Not a valid nft");
            storageUris[indexOfStorage] = bondDetails(index,tokenURI(index));
            indexOfStorage++;
        }
        return storageUris;
    }
}
