const hre = require('hardhat');
const { ethers } = require(`hardhat`);
const Token = '0x11464Dc907cA7c48FBE09b08dd4C969e349363D3'
const SkyMoney = '0x9Cb552291205B5A54E1cCc178354C91b77db25D4'

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