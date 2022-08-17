const hre = require('hardhat');
const { ethers } = require(`hardhat`);

const Token = '0xF28b5b9995C052a0e4EC1b848EafA6D3b29a7724'
const SkyMoney = '0x16465a1a7e569a83d072243c203Fb2E96521Bb36'

async function main() {
    console.log(`Verify SkyMoney contract`);
    res = await hre.run("verify:verify", {
        address: Token,
        constructorArguments: []
        ,
        optimizationFlag: true
    })
    console.log(res);


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