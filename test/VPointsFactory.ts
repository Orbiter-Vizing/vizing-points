import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { Wallet } from "ethers";

describe("VPointsFactory", function () {
  async function deployVPointsFactoryFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const VPointsFactory = await hre.ethers.getContractFactory(
      "VPointsFactory"
    );
    const vPointsFactory = await VPointsFactory.deploy();

    return { vPointsFactory, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("A", async function () {
      const { vPointsFactory, owner } = await loadFixture(
        deployVPointsFactoryFixture
      );

      const transaction = await vPointsFactory.createVPoints(
        Wallet.createRandom().address, // TODO
        "Orbiter Points",
        "OPoints"
      );
      console.log("transaction:", transaction);

      const receipt = await transaction.wait();

      console.log("receipt:", receipt);

      console.warn("receipt?.logs:", receipt?.logs[0]);

      // expect(await vPointsFactory.owner()).to.equal(owner.address);
    });
  });
});
