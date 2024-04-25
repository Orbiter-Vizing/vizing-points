import { parseEther, parseUnits } from "ethers";
import hre, { ethers } from "hardhat";

async function main() {
  const vPointsAddress = (process.env["VPOINTS"] || "").trim();
  let vPoints_MinerAddress = (process.env["VPOINTS_MINER"] || "").trim();

  if (!vPointsAddress) {
    throw new Error("Failed: invalid vPoints address");
  }

  if (!vPoints_MinerAddress) {
    const accounts = await hre.ethers.getSigners();
    vPoints_MinerAddress = accounts[0].address;
    console.log("Empty process.env['VPOINTS_MINER'], use signers[0]");
  }

  const vPoints = await hre.ethers.getContractAt("VPoints", vPointsAddress);

  const transaction = await vPoints.updateMiner(vPoints_MinerAddress);
  console.log("Waiting updateMiner:", transaction.hash);
  const receipt = await transaction.wait();

  console.log("UpdateMiner log:", receipt?.logs);
  console.log("UpdateMiner log:", receipt?.logs[0]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
