//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";

contract RockPaperScissors is Ownable {

    using SafeMath for uint256;
    using Address for address payable;

    address _winner;
    enum Options {Rock, Paper, Scissors}

    mapping(address => uint) public balances;
    mapping(address => uint) public votes;
    
    constructor() {
    }

    function deposit() payable public {
        balances[msg.sender] += msg.value;
    }

    function balanceOf(address usersAddress) public view returns(uint) {
        return balances[usersAddress];
    }

    function voteOf(address usersAddress) public view returns(uint) {
        return votes[usersAddress];
    }

    function winner() public view returns(address) {
        return _winner;
    }

    function submitVote(uint vote, uint amountToStake) external {
        require(amountToStake > 0, "Amount needs to be greater than zero");

        balances[msg.sender] = amountToStake;
        votes[msg.sender] = vote;
    }

    function play(address playerA, address playerB) external {
        require(votes[playerA] != votes[playerB], "It was a tie! Please submit new votes");

        if (votes[playerA] == 0) {
            if (votes[playerB] == 1) {
                _winner = playerB;
            }else if (votes[playerB] == 2) {
                _winner = playerA;
            }
        }else if (votes[playerA] == 1) {
            if (votes[playerB] == 0) {
                _winner = playerA;
            } else if (votes[playerB] == 2) {
                _winner = playerB;
            }
        } else {
            if (votes[playerB] == 0) {
                _winner = playerB;
            } else if(votes[playerB] == 1) {
                _winner = playerA;
            }
        }

        balances[_winner] = balances[_winner].add(_winner == playerA ? balances[playerB] : balances[playerA]);
    }

    function withdraw() external {
        require(balances[msg.sender] > 0, "This address has no balance");
        uint amountDeposited = balances[msg.sender];

        //payable(msg.sender).sendValue(amountDeposited);
        balances[msg.sender] = 0;
    }

}
