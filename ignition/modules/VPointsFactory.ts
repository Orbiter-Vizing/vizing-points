import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VPointsFactoryModule = buildModule("VPointsFactory", (m) => {
  const vPointsFactory = m.contract("VPointsFactory", [], {});

  return { vPointsFactory };
});

export default VPointsFactoryModule;
