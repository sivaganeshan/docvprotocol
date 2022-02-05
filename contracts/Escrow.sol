pragma solidity ^0.8.0;

contract Escrow{

     address public admin;

     address internal bondNftContract;

     modifier onlyAdmin {
            require(msg.sender == admin);
         _;
    }

     constructor(){
         admin = msg.sender;
     }



}