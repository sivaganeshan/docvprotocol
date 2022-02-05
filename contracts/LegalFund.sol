pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IbondNft.sol";

contract LegalFund is Ownable{

    IBondNftLegal internal legalBondNft;

    mapping(address=> uint256) legalBalance;

    constructor(address legalBondNft_){
        legalBondNft = IBondNftLegal(legalBondNft_);
    }
}