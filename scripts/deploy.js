//npx hardhat run scripts/deploy.js --network nameOfNetwork

const { ethers, network } = require('hardhat')


//const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7' mainnet
const Owner ='0x3f4F5d9971c265a7485540207023EA4B68Af6dc6'
const main = async () => {
    const [deployer] = await ethers.getSigners()
    console.log(`Deployer address: ${deployer.address}`)
    //let nonce = await network.provider.send('eth_getTransactionCount', [deployer.address, 'latest']) - 1
    const Token = await ethers.getContractFactory('Token')
    const token = await Token.deploy()
    await token.deployed();
    console.log(`Token address : ${token.address}`)
    const SkyMoney = await ethers.getContractFactory('SkyMoney')
    const skyMoney = await SkyMoney.deploy(token.address,Owner
    )
    await skyMoney.deployed();

    console.log(`SkyMoney deployed to: ${skyMoney.address}`)
}

main().then(() => process.exit(0)).catch(e => {console.error(e) && process.exit(1)})
