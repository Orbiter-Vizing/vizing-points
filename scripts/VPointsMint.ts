import { Wallet, parseEther, parseUnits } from "ethers";
import hre, { ethers } from "hardhat";

async function main() {
  const vPointsAddress = (process.env["VPOINTS"] || "").trim();

  if (!vPointsAddress) {
    throw new Error("Failed: invalid vPoints address");
  }

  const vPoints = await hre.ethers.getContractAt("VPoints", vPointsAddress);
  const miner = await vPoints.miner();

  const accounts = await hre.ethers.getSigners();
  const signer = accounts[0];

  if (signer.address.toLowerCase() != miner.toLowerCase()) {
    throw new Error(`Failed: signer[${signer.address}] ≠ miner[${miner}]`);
  }

  const vPointsWithSigner = vPoints.connect(signer);

  for (let i = 0; i < 5; i++) {
    const to = signer.address;
    const amount = parseEther("100");
    const transaction = await vPointsWithSigner.mint(
      to,
      amount,
      `Reward for task ${i + 1}`
    );

    console.log("Send transaction: ", transaction.hash);
    await transaction.wait();
  }

  console.log("Done");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
