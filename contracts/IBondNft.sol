pragma solidity ^0.8.0;

struct bondDetails{
        uint256 bondId;
        string cid;
    }

interface IBondNftMint {
    function mintABond(address to_, string memory storageUri_)
        external
        returns (uint256);
}

interface IBondNftLegal {

    

    function updateABond(
        uint256 id_,
        string memory hashedDoc_,
        string memory storageUri_
    ) external returns (bool);

    function verifyBond(uint256 id_, string memory hashedDoc_)
        external
        view
        returns (bool);

    function getAllBonds(uint256 start_, uint8 bondCount_)
        external
        view
        returns (bondDetails[] memory);
}
