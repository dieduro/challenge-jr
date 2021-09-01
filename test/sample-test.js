const { expect } = require("chai");
const { ethers } = require("hardhat");
const ONE_ETH = ethers.utils.parseUnits('1','ether')

describe("RockPaperScissors", function () {

  let deployer, userA;

  beforeEach(async function () {
      [deployer, userA] = await ethers.getSigners();
      const RockPaperScissors = await ethers.getContractFactory("RockPaperScissors");
      this.rockPaperScissors = await RockPaperScissors.deploy();
      await this.rockPaperScissors.deployed();
    
      await this.rockPaperScissors.connect(userA).deposit(ONE_ETH);
  });
  describe("RockPaperScissors", function () {
    it("The contract owner is the deployer", async function () {
      expect(await this.rockPaperScissors.owner()).to.equal(deployer.address);
    });

    it("Deposits the correct amount in sender's address", async function () {
      expect(await this.rockPaperScissors.balanceOf(userA.address)).to.equal(ONE_ETH);
    });
  
  })
});
