const Migrations = artifacts.require("SkyMoney.sol");
const token = artifacts.require("Token.sol");

module.exports = async function (deployer) {
  await deployer.deploy(token);
  await deployer.deploy(Migrations,token,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
  TokenInstance = await token.deployer();
  await TokenInstance.mint("0x7F1349E5b74007C55137bFF9372C72C4F14a33b4","10000000000000000000000000000000000000000");
  await TokenInstance.mint("0x3f4F5d9971c265a7485540207023EA4B68Af6dc6","10000000000000000000000000000000000000000");
};
