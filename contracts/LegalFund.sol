pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IBondNft.sol";
import './ILegalFund.sol';

contract LegalFund is Ownable, ILegalFund{


    mapping(address=> uint256) public legalBalance;

    constructor(){
    }

    function depositToLegalMember(address to_) external override payable {
        require(msg.value> 0.1 ether, "Error2 invalid fund");
        if(legalBalance[to_] == 0){
            legalBalance[to_] = msg.value;
        }else{
            legalBalance[to_] = legalBalance[to_]+msg.value;
        }
    }

    function withdrawLegalMemberBalance() external {
           require(legalBalance[_msgSender()]>0, "no balance for the member");
           uint256 amount = legalBalance[_msgSender()];
           legalBalance[_msgSender()] = 0;
           payable(_msgSender()).transfer(amount);
    }
}