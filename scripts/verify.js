const hre = require('hardhat');
const { ethers } = require(`hardhat`);
const Token = '0x2fA52CF5e069544ca053FFCeB9aCF725a12141AD'
const SkyMoney = '0xf206445A308ba1EDdE0a9B62F667d79883e04963'

async function main() {
    // console.log(`Verify SkyMoney contract`);
    // res = await hre.run("verify:verify", {
    //     address: Token,
    //     constructorArguments: []
    //     ,
    //     optimizationFlag: true
    // })
    // console.log(res);


    console.log(`Verify SkyMoney contract`);
    res2 = await hre.run("verify:verify", {
        address: SkyMoney,
        constructorArguments: [
            Token,
    '0x3f4F5d9971c265a7485540207023EA4B68Af6dc6',
        ],
        optimizationFlag: true
    })
    console.log(res2);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });