pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IbondNft.sol";

contract Escrow is Ownable{

     string public name;

     IBondNftMint internal bondNftContract;


     constructor(string memory name_, address bondNft_){
         name = name_;
         bondNftContract = IBondNftMint(bondNft_);
     }





}