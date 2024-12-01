import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { getAddress, parseEther } from 'viem'

describe('Faucet', function () {
  async function deployFaucetFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients()

    const initialSupply = parseEther('1000000') // 1 million tokens

    const testToken = await hre.viem.deployContract('Token', [
      'MyToken',
      'MTK',
      initialSupply
    ])

    const faucet = await hre.viem.deployContract('Faucet', [testToken.address])

    await testToken.write.transfer([faucet.address, parseEther('50000')])

    const publicClient = await hre.viem.getPublicClient()

    return {
      faucet,
      testToken,
      owner,
      otherAccount,
      publicClient
    }
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)
      expect(await faucet.read.owner()).to.equal(
        getAddress(owner.account.address)
      )
    })

    it('Should set the correct token address', async function () {
      const { faucet, testToken } = await loadFixture(deployFaucetFixture)
      expect(await faucet.read.token()).to.equal(getAddress(testToken.address))
    })

    it('Should have the correct initial amount', async function () {
      const { faucet, testToken } = await loadFixture(deployFaucetFixture)
      expect(
        await testToken.read.balanceOf([getAddress(faucet.address)])
      ).to.equal(parseEther('50000'))
    })
  })

  describe('Token Requests', function () {
    it('Should allow users to request tokens', async function () {
      const { faucet, testToken, otherAccount } =
        await loadFixture(deployFaucetFixture)

      const faucetAsOther = await hre.viem.getContractAt(
        'Faucet',
        faucet.address,
        { client: { wallet: otherAccount } }
      )

      const balanceBefore = BigInt(
        (await testToken.read.balanceOf([
          otherAccount.account.address
        ])) as string
      )
      await faucetAsOther.write.requestTokens()
      const balanceAfter = BigInt(
        (await testToken.read.balanceOf([
          otherAccount.account.address
        ])) as string
      )

      expect(balanceAfter - balanceBefore).to.equal(parseEther('50'))
    })

    it('Should prevent requests before lockTime expires', async function () {
      const { faucet, otherAccount } = await loadFixture(deployFaucetFixture)

      const faucetAsOther = await hre.viem.getContractAt(
        'Faucet',
        faucet.address,
        { client: { wallet: otherAccount } }
      )

      await faucetAsOther.write.requestTokens()

      await expect(faucetAsOther.write.requestTokens()).to.be.rejectedWith(
        'Insufficient time elapsed since last withdrawal'
      )
    })
  })

  describe('Owner Functions', function () {
    it('Should allow owner to change withdrawal amount', async function () {
      const { faucet } = await loadFixture(deployFaucetFixture)

      const newAmount = parseEther('100')
      await faucet.write.setWithdrawalAmount([newAmount])

      expect(await faucet.read.withdrawAmount()).to.equal(newAmount)
    })

    it('Should allow owner to change lock time', async function () {
      const { faucet } = await loadFixture(deployFaucetFixture)

      const newLockTime = 5n // 5 minutes
      await faucet.write.setLockTime([newLockTime])

      expect(await faucet.read.lockTime()).to.equal(newLockTime * 60n) // converted to seconds
    })

    it('Should allow owner to withdraw all tokens', async function () {
      const { faucet, testToken, owner } =
        await loadFixture(deployFaucetFixture)

      const balanceBefore = BigInt(
        (await testToken.read.balanceOf([owner.account.address])) as string
      )
      const faucetBalance = BigInt(
        (await testToken.read.balanceOf([faucet.address])) as string
      )

      await faucet.write.withdrawal()

      const balanceAfter = BigInt(
        (await testToken.read.balanceOf([owner.account.address])) as string
      )
      expect(balanceAfter - balanceBefore).to.equal(faucetBalance)
    })
  })

  describe('Pause Functionality', function () {
    it('Should allow owner to pause and unpause', async function () {
      const { faucet } = await loadFixture(deployFaucetFixture)

      await faucet.write.pause()
      expect(await faucet.read.paused()).to.be.true

      await faucet.write.unpause()
      expect(await faucet.read.paused()).to.be.false
    })

    it('Should prevent token requests when paused', async function () {
      const { faucet, otherAccount } = await loadFixture(deployFaucetFixture)

      const faucetAsOther = await hre.viem.getContractAt(
        'Faucet',
        faucet.address,
        { client: { wallet: otherAccount } }
      )

      await faucet.write.pause()

      await expect(faucetAsOther.write.requestTokens()).to.be.rejectedWith(
        'Contract is paused'
      )
    })
  })

  describe('Events', function () {
    it('Should emit Withdrawal event when tokens are withdrawn', async function () {
      const { faucet, publicClient } = await loadFixture(deployFaucetFixture)

      const hash = await faucet.write.withdrawal()
      await publicClient.waitForTransactionReceipt({ hash })

      const withdrawalEvents = await faucet.getEvents.Withdrawal()
      expect(withdrawalEvents).to.have.lengthOf(1)
      expect((withdrawalEvents[0].args as { amount: bigint }).amount).to.equal(
        parseEther('50000')
      )
    })

    it('Should emit Paused event when contract is paused', async function () {
      const { faucet, publicClient } = await loadFixture(deployFaucetFixture)

      const hash = await faucet.write.pause()
      await publicClient.waitForTransactionReceipt({ hash })

      const pausedEvents = await faucet.getEvents.Paused()
      expect(pausedEvents).to.have.lengthOf(1)
    })
  })
})
