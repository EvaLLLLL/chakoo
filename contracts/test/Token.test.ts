import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { getAddress, parseEther } from 'viem'

describe('Token', function () {
  async function deployTokenFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients()
    const initialSupply = parseEther('1000000') // 1 million tokens

    const token = await hre.viem.deployContract('Token', [
      'MyToken',
      'MTK',
      initialSupply
    ])

    const publicClient = await hre.viem.getPublicClient()

    return { token, initialSupply, owner, otherAccount, publicClient }
  }

  describe('Deployment', function () {
    it('Should set the right name and symbol', async function () {
      const { token } = await loadFixture(deployTokenFixture)

      expect(await token.read.name()).to.equal('MyToken')
      expect(await token.read.symbol()).to.equal('MTK')
    })

    it('Should set the right owner', async function () {
      const { token, owner } = await loadFixture(deployTokenFixture)

      expect(await token.read.owner()).to.equal(
        getAddress(owner.account.address)
      )
    })

    it('Should assign the total supply of tokens to the owner', async function () {
      const { token, owner, initialSupply } =
        await loadFixture(deployTokenFixture)

      expect(await token.read.totalSupply()).to.equal(initialSupply)
      expect(await token.read.balanceOf([owner.account.address])).to.equal(
        initialSupply
      )
    })
  })

  describe('Capped', function () {
    it('Should enforce the max supply cap', async function () {
      const { token, owner, initialSupply } =
        await loadFixture(deployTokenFixture)

      await expect(
        token.write.mint([owner.account.address, 1n])
      ).to.be.rejectedWith('ERC20Capped: cap exceeded')
    })

    it('Should return the correct cap', async function () {
      const { token, initialSupply } = await loadFixture(deployTokenFixture)

      expect(await token.read.cap()).to.equal(initialSupply)
    })
  })

  describe('Transfers', function () {
    it('Should transfer tokens between accounts', async function () {
      const { token, owner, otherAccount } =
        await loadFixture(deployTokenFixture)
      const amount = parseEther('100')

      await token.write.transfer([otherAccount.account.address, amount])

      expect(
        await token.read.balanceOf([otherAccount.account.address])
      ).to.equal(amount)
    })
  })

  describe('Burning', function () {
    it('Should allow token burning', async function () {
      const { token, owner, initialSupply } =
        await loadFixture(deployTokenFixture)
      const burnAmount = parseEther('100')

      await token.write.burn([burnAmount])

      expect(await token.read.totalSupply()).to.equal(
        initialSupply - burnAmount
      )
      expect(await token.read.balanceOf([owner.account.address])).to.equal(
        initialSupply - burnAmount
      )
    })
  })

  describe('Minting', function () {
    it('Should allow owner to mint tokens within cap', async function () {
      const { token, otherAccount, initialSupply } =
        await loadFixture(deployTokenFixture)
      const mintAmount = parseEther('100')

      await token.write.burn([parseEther('200')])

      await token.write.mint([otherAccount.account.address, mintAmount])

      expect(
        await token.read.balanceOf([otherAccount.account.address])
      ).to.equal(mintAmount)
      expect(await token.read.totalSupply()).to.equal(
        initialSupply - parseEther('200') + mintAmount
      )
    })

    it('Should not allow non-owners to mint tokens', async function () {
      const { token, otherAccount } = await loadFixture(deployTokenFixture)

      const tokenAsOther = await hre.viem.getContractAt(
        'Token',
        token.address,
        {
          client: { wallet: otherAccount }
        }
      )

      await expect(
        tokenAsOther.write.mint([
          otherAccount.account.address,
          parseEther('100')
        ])
      ).to.be.rejected
    })
  })
})
