import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Faucet', function () {
  async function deployFaucetFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const tokenName = 'MyToken'
    const tokenSymbol = 'MTK'
    const initialSupply = ethers.parseEther('1000000') // 1 million tokens

    const Token = await ethers.getContractFactory('Token')
    const token = await Token.deploy(tokenName, tokenSymbol, initialSupply)

    const Faucet = await ethers.getContractFactory('Faucet')
    const faucet = await Faucet.deploy(await token.getAddress())

    const faucetTokens = ethers.parseEther('10000') // 10,000 tokens
    await token.transfer(await faucet.getAddress(), faucetTokens)

    return { faucet, token, owner, otherAccount, faucetTokens }
  }

  describe('Deployment', function () {
    it('Should set the right token address', async function () {
      const { faucet, token } = await loadFixture(deployFaucetFixture)
      expect(await faucet.token()).to.equal(await token.getAddress())
    })

    it('Should set the right owner', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)
      expect(await faucet.owner()).to.equal(owner.address)
    })

    it('Should have the correct initial balance', async function () {
      const { faucet, faucetTokens } = await loadFixture(deployFaucetFixture)
      expect(await faucet.getBalance()).to.equal(faucetTokens)
    })
  })

  describe('Token Requests', function () {
    it('Should allow users to request tokens', async function () {
      const { faucet, token, otherAccount } =
        await loadFixture(deployFaucetFixture)

      const withdrawAmount = await faucet.withdrawAmount()
      await faucet.connect(otherAccount).requestTokens()

      expect(await token.balanceOf(otherAccount.address)).to.equal(
        withdrawAmount
      )
    })

    it('Should prevent requests before lockTime expires', async function () {
      const { faucet, otherAccount } = await loadFixture(deployFaucetFixture)

      await faucet.connect(otherAccount).requestTokens()

      await expect(
        faucet.connect(otherAccount).requestTokens()
      ).to.be.revertedWith(
        'Insufficient time elapsed since last withdrawal - please try again later'
      )
    })
  })

  describe('Owner Functions', function () {
    it('Should allow owner to change withdrawal amount', async function () {
      const { faucet } = await loadFixture(deployFaucetFixture)

      const newAmount = ethers.parseEther('100')
      await faucet.setWithdrawalAmount(newAmount)

      expect(await faucet.withdrawAmount()).to.equal(newAmount)
    })

    it('Should allow owner to change lock time', async function () {
      const { faucet } = await loadFixture(deployFaucetFixture)

      const newLockTime = 5 // 5 minutes
      await faucet.setLockTime(newLockTime)

      expect(await faucet.lockTime()).to.equal(newLockTime * 60) // converted to seconds
    })

    it('Should allow owner to withdraw all tokens', async function () {
      const { faucet, token, owner, faucetTokens } =
        await loadFixture(deployFaucetFixture)

      const initialOwnerBalance = await token.balanceOf(owner.address)
      await faucet.withdrawal()

      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance + faucetTokens
      )
      expect(await faucet.getBalance()).to.equal(0)
    })
  })

  describe('Pause Functionality', function () {
    it('Should allow owner to pause and unpause', async function () {
      const { faucet } = await loadFixture(deployFaucetFixture)

      await faucet.pause()
      expect(await faucet.paused()).to.be.true

      await faucet.unpause()
      expect(await faucet.paused()).to.be.false
    })

    it('Should prevent token requests when paused', async function () {
      const { faucet, otherAccount } = await loadFixture(deployFaucetFixture)

      await faucet.pause()

      await expect(
        faucet.connect(otherAccount).requestTokens()
      ).to.be.revertedWith('Contract is paused')
    })
  })

  describe('ETH Handling', function () {
    it('Should accept ETH deposits', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)

      const depositAmount = ethers.parseEther('1')
      await owner.sendTransaction({
        to: await faucet.getAddress(),
        value: depositAmount
      })

      expect(
        await ethers.provider.getBalance(await faucet.getAddress())
      ).to.equal(depositAmount)
    })

    it('Should allow owner to withdraw ETH', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)

      const depositAmount = ethers.parseEther('1')
      await owner.sendTransaction({
        to: await faucet.getAddress(),
        value: depositAmount
      })

      await expect(faucet.withdrawETH()).to.changeEtherBalances(
        [faucet, owner],
        [-depositAmount, depositAmount]
      )
    })
  })
})
