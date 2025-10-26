const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("YieldPassportModule", (m) => {
  
  const initialAttesters = [
    "0x28dbf68b2f778f19eff0ef7288caac8538bb5639"
  ];

  
  const yieldPassport = m.contract("YieldPassport", [initialAttesters]);

  return { yieldPassport };
});
