pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IbondNft.sol";
import './ILegalFund.sol';

contract LegalFund is Ownable, ILegalFund{

    IBondNftLegal internal legalBondNft;

    mapping(address=> uint256) legalBalance;

    constructor(address legalBondNft_){
        legalBondNft = IBondNftLegal(legalBondNft_);
    }

    function depositToLegalMember(address to_) external payable {
        legalBalance[to_] = legalBalance[to_]+msg.value;
    }

    function withdrawLegalMemberBalanace() external {
           require(legalBalance[_msgSender()]>0, "no balance for the member");
           uint256 amount = legalBalance[_msgSender()];
           legalBalance[_msgSender()] = 0;
           payable(_msgSender()).transfer(amount);
    }
}