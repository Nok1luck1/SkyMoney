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
        const initValue = [Token.address,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6",];
        const SkyMoney = await ethers.getContractFactory("SkyMoney")
        const skyMoney = await upgrades.deployProxy(SkyMoney,initValue,{initializer: "initialize", kind: "uups"});
        await skyMoney.deployed();
        await Token.connect(owner).mint(owner.address,"1000000000000000000000000000000");
        expect (await Token.balanceOf(owner.address).to,be.equal("1000000000000000000000000000000"));
        console.log(estimateGas);
        console.log(SkyMoney.getLevel);
        return {SkyMoney,owner,Token}
    }

    it("Should be equal owner address", async function () {
        const {SkyMoney,owner} = await loadFixture(deploySkyMoneyFixture);
        expect(await SkyMoney.connect(owner).hasRole("0x0000000000000000000000000000000000000000000000000000000000000000",owner.address)).to.equal(true);
    })
    it("Should be equal token  address", async function () {
        const {SkyMoney,Token} = await loadFixture(deploySkyMoneyFixture);
        expect(await SkyMoney.connect(owner).Token()).to.equal(Token.address);
    })
    it("Should be error on Buy level", async function () {
        const {SkyMoney,Token,owner} = await loadFixture(deploySkyMoneyFixture);
        await Token.connect(owner).approve(SkyMoney.address,"400000000000000000000");
        await SkyMoney.connect(owner).buyLevel("0",owner.address);
        await SkyMoney.connect(owner).buyLevel("0",owner.address);
        await expect(SkyMoney.buyLevel("0",owner.address)).to.be.revertedWith("You cant buy more this level yet");
    })
    it("Should be error with pause", async function(){
        const {SkyMoney,Token,owner } = await loadFixture(deploySkyMoneyFixture);
        await SkyMoney.setPause(true);
        await Token.connect(owner).approve(SkyMoney.address,"400000000000000000000");
        await expect (SkyMoney.connect(owner).buyLevel("0",owner.address).to.be.revertedWith("Pausable: paused"));

    })
    
})