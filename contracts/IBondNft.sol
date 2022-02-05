pragma solidity ^0.8.0;

interface IBondNft{

    function mintABond(address to_, string memory storageUri_) external returns(uint256);
    function updateABond(uint256 id_, string memory hashedDoc_, string memory) external returns(bool);
    function verifyBond(uint256 id_, string memory hashedDoc_) external view returns(bool);
}