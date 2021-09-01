//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RockPaperScissors is Ownable {

    mapping(address => uint) public deposits;

    constructor() {
    }

    function deposit(uint amount) public {
        deposits[msg.sender] = amount;
    }

    function balanceOf(address usersAddress) public view returns(uint) {
        return deposits[usersAddress];
    }
}
