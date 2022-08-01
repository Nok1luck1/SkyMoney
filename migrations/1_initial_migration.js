const Migrations = artifacts.require("SkyMoney.sol");
const token = artifacts.require("Token.sol");

module.exports = async function (deployer) {
  //await deployer.deploy(token);
  await deployer.deploy(Migrations,"0x09C34ca836967B69C51BceA250ee7834A7BdD29C","0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
};
