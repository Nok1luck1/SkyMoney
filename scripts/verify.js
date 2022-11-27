const hre = require("hardhat");
const { ethers } = require(`hardhat`);
const Token = "0x19E71C2A26EF2c57A5fA3538cF86411F050896Df";
const Token2 = "0xCB905Cf06C6680dA1a86701B00429BE690Eed71a";
const SkyMoney = "0xf206445A308ba1EDdE0a9B62F667d79883e04963";

async function main() {
  // console.log(`Verify TestToken contract`);
  // res = await hre.run("verify:verify", {
  //   address: "0x088AfbcDEF19677070002941d946f01a50a6235b",
  //   constructorArguments: [],
  //   optimizationFlag: true,
  // });
  // console.log(res);

  console.log(`Verify SkyMoney contract`);
  res2 = await hre.run("verify:verify", {
    address: "0x9145E1845d211e4a975Af4aE360E91d0289a5843",
    constructorArguments: [],
    optimizationFlag: true,
  });
  console.log(res2);

  // console.log(`Verify SkyMoney contract`);
  // res2 = await hre.run("verify:verify", {
  //     address: SkyMoney,
  //     constructorArguments: [
  //         Token,
  // '0x3f4F5d9971c265a7485540207023EA4B68Af6dc6',
  //     ],
  //     optimizationFlag: true
  // })
  // console.log(res2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
