import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Token', function () {
  async function deployTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const tokenName = 'MyToken'
    const tokenSymbol = 'MTK'
    const initialSupply = ethers.parseEther('1000000') // 1 million tokens

    const Token = await ethers.getContractFactory('Token')
    const token = await Token.deploy(tokenName, tokenSymbol, initialSupply)

    return { token, tokenName, tokenSymbol, initialSupply, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should set the right name and symbol', async function () {
      const { token, tokenName, tokenSymbol } =
        await loadFixture(deployTokenFixture)

      expect(await token.name()).to.equal(tokenName)
      expect(await token.symbol()).to.equal(tokenSymbol)
    })

    it('Should set the right owner', async function () {
      const { token, owner } = await loadFixture(deployTokenFixture)

      expect(await token.owner()).to.equal(owner.address)
    })

    it('Should mint initial supply to owner', async function () {
      const { token, initialSupply, owner } =
        await loadFixture(deployTokenFixture)

      expect(await token.balanceOf(owner.address)).to.equal(initialSupply)
    })

    it('Should set the right cap', async function () {
      const { token, initialSupply } = await loadFixture(deployTokenFixture)

      expect(await token.cap()).to.equal(initialSupply)
    })
  })

  describe('Transactions', function () {
    it('Should transfer tokens between accounts', async function () {
      const { token, owner, otherAccount } =
        await loadFixture(deployTokenFixture)

      const transferAmount = ethers.parseEther('100')
      await token.transfer(otherAccount.address, transferAmount)

      expect(await token.balanceOf(otherAccount.address)).to.equal(
        transferAmount
      )
    })

    it('Should fail if sender does not have enough tokens', async function () {
      const { token, owner, otherAccount } =
        await loadFixture(deployTokenFixture)

      const initialOwnerBalance = await token.balanceOf(
        owner.address.toString()
      )

      await expect(
        token.connect(otherAccount).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(token, 'ERC20InsufficientBalance')
    })
  })

  describe('Burning', function () {
    it('Should allow token holder to burn their tokens', async function () {
      const { token, owner } = await loadFixture(deployTokenFixture)

      const burnAmount = ethers.parseEther('100')
      const initialBalance = await token.balanceOf(owner.address)

      await token.burn(burnAmount)

      expect(await token.balanceOf(owner.address)).to.equal(
        initialBalance - burnAmount
      )
    })

    it('Should fail if trying to burn more than balance', async function () {
      const { token, owner } = await loadFixture(deployTokenFixture)

      const initialBalance = await token.balanceOf(owner.address)

      await expect(
        token.burn(initialBalance + 1n)
      ).to.be.revertedWithCustomError(token, 'ERC20InsufficientBalance')
    })
  })

  describe('Capped behavior', function () {
    it('Should not allow minting above cap', async function () {
      const { token, initialSupply, owner } =
        await loadFixture(deployTokenFixture)

      await expect(token.mint(owner.address, 1)).to.be.revertedWithCustomError(
        token,
        'ERC20ExceededCap'
      )
    })
  })
})
