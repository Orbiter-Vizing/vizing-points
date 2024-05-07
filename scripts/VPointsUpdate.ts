import hre from "hardhat";

async function main() {
  const vPointsAddress = (process.env["VPOINTS"] || "").trim();
  const vPointsOwnerAddress = (process.env["VPOINTS_OWNER"] || "").trim();
  let vPointsMinerAddress = (process.env["VPOINTS_MINER"] || "").trim();

  if (!vPointsAddress) {
    throw new Error("Failed: invalid vPoints address");
  }

  if (!vPointsMinerAddress) {
    const accounts = await hre.ethers.getSigners();
    vPointsMinerAddress = accounts[0].address;
    console.log("Empty process.env['VPOINTS_MINER'], use signers[0]");
  }

  const vPoints = await hre.ethers.getContractAt("VPoints", vPointsAddress);

  const transaction0 = await vPoints.updateMiner(vPointsMinerAddress);
  console.log("Waiting updateMiner:", transaction0.hash);
  const receipt0 = await transaction0.wait();
  console.log("UpdateMiner logs:", receipt0?.logs);

  if (vPointsOwnerAddress) {
    const transaction1 = await vPoints.transferOwnership(vPointsOwnerAddress);
    console.log("Waiting transferOwnership:", transaction1.hash);
    const receipt1 = await transaction1.wait();
    console.log("TransferOwnership logs:", receipt1?.logs);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
