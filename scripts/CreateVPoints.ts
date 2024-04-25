import { parseEther, parseUnits } from "ethers";
import hre, { ethers } from "hardhat";

async function main() {
  const vPointsFactoryAddress = (process.env["VPOINTS_FACTORY"] || "").trim();

  if (!vPointsFactoryAddress) {
    throw new Error("Failed: invalid address");
  }

  const vPointsFactory = await hre.ethers.getContractAt(
    "VPointsFactory",
    vPointsFactoryAddress
  );

  const transaction = await vPointsFactory.createVPoints(
    "Vizing Points",
    "VPoints"
  );
  console.log("Waiting createVPoints:", transaction.hash);
  const receipt = await transaction.wait();

  console.log("CreateVPoints log:", receipt?.logs[1]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
