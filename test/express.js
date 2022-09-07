const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
require("hardhat-gas-reporter");

// describe(string, anonymous function)
describe("SkyMoney", function () {
     async function deploySkyMoneyFixture() {
        const [owner] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const Token = await token.deploy();
        await Token.deployed();
        const skyMoney = await ethers.getContractFactory("SkyMoney")
        const SkyMoney = await skyMoney.deploy(Token.address,owner.address);
        await SkyMoney.deployed();
        console.log(SkyMoney.getLevel);
        return {SkyMoney,owner,Token}
    }

    it("Should be equal owner  address", async function () {
        const {SkyMoney,owner} = await loadFixture(deploySkyMoneyFixture);
        expect(await SkyMoney.owner()).to.equal(owner.address);
    })
    it("Should be equal token  address", async function () {
        const {SkyMoney,Token} = await loadFixture(deploySkyMoneyFixture);
        expect(await SkyMoney.Token()).to.equal(Token.address);
    })
    it("Should be error on Buy level", async function () {
        const {SkyMoney,Token,owner} = await loadFixture(deploySkyMoneyFixture);
        await Token.approve(SkyMoney.address,"400000000000000000000");
        await SkyMoney.buyLevel("0",owner.address);
        await SkyMoney.buyLevel("0",owner.address);
        await expect(SkyMoney.buyLevel("0",owner.address)).to.be.revertedWith("You cant buy more this level yet");
    })
    
})