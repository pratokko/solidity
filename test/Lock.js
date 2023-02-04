
const { hre } = require("hardhat")
const assert = require("chai").assert
// const chai = require("chai")
// const expect = chai.expect

require("@nomicfoundation/hardhat-chai-matchers")

describe("SimpleStorage", function () {

let simpleStorageFactory
let simpleStorage

  beforeEach (async function () {
   simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

   simpleStorage = await simpleStorageFactory.deploy()
  })


  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    //assert
    //expect
    // expect(currentValue.toString()).to.equal(expectedValue)
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("should update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)

  })
})