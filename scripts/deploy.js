//npx hardhat run scripts/deploy.js --network nameOfNetwork

const { ethers, network } = require("hardhat");

//const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7' mainnet
const Owner = "0x3f4F5d9971c265a7485540207023EA4B68Af6dc6";
const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);
  //let nonce = await network.provider.send('eth_getTransactionCount', [deployer.address, 'latest']) - 1
  // const Token = await ethers.getContractFactory("LUNA");
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log(token.address);

  // const Token2 = await ethers.getContractFactory("DOGE");
  // const token2 = await Token2.deploy();
  // await token2.deployed();
  // console.log(token2.address);
  //"0xdAC17F958D2ee523a2206206994597C13D831ec7", //token
  // "0xf6f0727E685957A5a778204B1B3620aE99a7Cd7A";
  // const initValue = [
  //   "0xF28b5b9995C052a0e4EC1b848EafA6D3b29a7724", //token
  //   "0x3f4F5d9971c265a7485540207023EA4B68Af6dc6", //owner
  // ];

  const initValue = [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7", //token
    "0xf6f0727E685957A5a778204B1B3620aE99a7Cd7A", //owner
  ];
  //console.log(`Token address : ${token.address}`)
  //const controller = await upgrades.deployProxy(Controller, initValue, { });
  const SkyMoney = await ethers.getContractFactory("SkyMoney");

  // const skyMoney = await SkyMoney.deploy(
  //   "0x3f4F5d9971c265a7485540207023EA4B68Af6dc6",
  //   "0xF28b5b9995C052a0e4EC1b848EafA6D3b29a7724" //token
  // );

  const skyMoney = await upgrades.deployProxy(SkyMoney, initValue, {
    initializer: "initialize",
    kind: "uups",
  });
  await skyMoney.deployed();
  //npx hardhat verify --network goerli addressSkyMoney

  console.log(`SkyMoney deployed to: ${skyMoney.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e) && process.exit(1);
  });
