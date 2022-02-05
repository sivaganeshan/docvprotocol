pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IbondNft.sol";
import "./ILegalFund.sol";

contract Escrow is Ownable{

     string public name;

     IBondNftMint internal bondNftContract;
     ILegalFund internal legalFundContract;

     constructor(string memory name_, address bondNft_, address fundContract_){
         name = name_;
         bondNftContract = IBondNftMint(bondNft_);
         legalFundContract = ILegalFund(fundContract_);
     }

    function createABond(string memory uri_, address legalMember) external payable returns(uint256){
        uint256 bondId = bondNftContract.mintABond(_msgSender(), uri_);
        legalFundContract.depositToLegalMember{value:msg.value}(legalMember);
        return bondId;
    }
}