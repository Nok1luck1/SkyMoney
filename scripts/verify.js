const hre = require('hardhat');
const { ethers } = require(`hardhat`);
const Token = '0xb6579F126CbfbdBFbF0Df3029e2e4C8B7024063C'
const SkyMoney = '0x46fD1e80452e077B1ed3b4123e08888F9751FDfb'

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