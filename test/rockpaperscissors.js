const { expect } = require("chai");
const { ethers } = require("hardhat");
const ONE_ETH = ethers.utils.parseUnits("1", "ether");
const TWO_ETH = ethers.utils.parseUnits("2", "ether");

describe("RockPaperScissors", async function () {
  let deployer, userA, userB, winner;

  before(async function () {
    [deployer, userA, userB] = await ethers.getSigners();
    const RockPaperScissors = await ethers.getContractFactory(
      "RockPaperScissors"
    );
    this.rockPaperScissors = await RockPaperScissors.deploy();
    await this.rockPaperScissors.deployed();

    console.log("userA: " + userA.address);
    console.log("userB: " + userB.address);

    await this.rockPaperScissors.connect(userA).deposit({ value: ONE_ETH });
    await this.rockPaperScissors.connect(userA).submitVote(2, ONE_ETH);
    await this.rockPaperScissors.connect(userB).submitVote(0, ONE_ETH);
    await this.rockPaperScissors.play(userA.address, userB.address);
  });

  describe("RockPaperScissors", function () {
    it("The contract owner is the deployer", async function () {
      expect(await this.rockPaperScissors.owner()).to.equal(deployer.address);
    });

    it("Deposits the correct amount in sender's address", async function () {
      expect(await this.rockPaperScissors.balanceOf(userA.address)).to.equal(
        ONE_ETH
      );
    });

    it("Player's vote is 2", async function () {
      expect(await this.rockPaperScissors.voteOf(userA.address)).to.equal(2);
    });

    it("User B wins", async function () {
      expect(await this.rockPaperScissors.winner()).to.equal(userB.address);
    });

    it("User B's balance -in contract- is 2 ETH", async function () {
      expect(await this.rockPaperScissors.balanceOf(userB.address)).to.equal(
        TWO_ETH
      );
    });

    after(async function () {
      await this.rockPaperScissors.connect(userB).withdraw();
    });
  });
});
