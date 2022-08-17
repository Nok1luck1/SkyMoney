const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// describe(string, anonymous function)
describe("SimpleStorage", function () {
   
    let SkyMoney, SkyMoneyInstance

    beforeEach(async function () {
        SkyMoney = await ethers.getContractFactory("SkyMoney")
        SkyMoneyInstance = await SkyMoney.deploy("0x3f4F5d9971c265a7485540207023EA4B68Af6dc6","0x3f4F5d9971c265a7485540207023EA4B68Af6dc6")
    })

    // what to test
    it("Buy Level instruction", async function () {
        const currentValue = await SkyMoney.buyLevel(0,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
        const currentValue1 = await SkyMoney.buyLevel(0,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
        const currentValue2 = await SkyMoney.buyLevel(0,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
        const currentValue3 = await SkyMoney.buyLevel(0,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
        const currentValue4 = await SkyMoney.buyLevel(0,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");
        const currentValue5 = await SkyMoney.buyLevel(0,"0x3f4F5d9971c265a7485540207023EA4B68Af6dc6");

        console.log(currentValue5);
    })

    

    it("Should update people array when people push is called", async function () {
        const expectedToken = "0x3f4F5d9971c265a7485540207023EA4B68Af6dc6"
        const transactionResponse = await SkyMoney.changeToken(expectedToken);
        const updatedToken = await SkyMoney.Token();
        assert.equal(expectedToken, updatedToken);

    })
})