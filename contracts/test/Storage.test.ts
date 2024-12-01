import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('Storage', function () {
  async function deployStorageFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients()
    const storage = await hre.viem.deployContract('Storage')
    const publicClient = await hre.viem.getPublicClient()

    return { storage, owner, otherAccount, publicClient }
  }

  describe('Item Operations', function () {
    it('Should create an item', async function () {
      const { storage, publicClient } = await loadFixture(deployStorageFixture)

      const hash = await storage.write.create(['test value'])
      await publicClient.waitForTransactionReceipt({ hash })

      const events = await storage.getEvents.ItemCreated()
      expect(events).to.have.lengthOf(1)
      expect((events[0].args as { id: bigint }).id).to.equal(1n)
      expect((events[0].args as { value: string }).value).to.equal('test value')
    })

    it('Should not create an empty item', async function () {
      const { storage } = await loadFixture(deployStorageFixture)
      await expect(storage.write.create([''])).to.be.rejectedWith(
        'Value cannot be empty'
      )
    })

    it('Should read an item', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await storage.write.create(['test value'])
      const value = await storage.read.read([1n])
      expect(value).to.equal('test value')
    })

    it('Should update an item', async function () {
      const { storage, publicClient } = await loadFixture(deployStorageFixture)

      await storage.write.create(['test value'])
      const hash = await storage.write.update([1n, 'updated value'])
      await publicClient.waitForTransactionReceipt({ hash })

      const value = await storage.read.read([1n])
      expect(value).to.equal('updated value')

      const events = await storage.getEvents.ItemUpdated()
      expect(events).to.have.lengthOf(1)
      expect((events[0].args as { value: string }).value).to.equal(
        'updated value'
      )
    })

    it('Should remove an item', async function () {
      const { storage, publicClient } = await loadFixture(deployStorageFixture)

      await storage.write.create(['test value'])
      const hash = await storage.write.remove([1n])
      await publicClient.waitForTransactionReceipt({ hash })

      await expect(storage.read.read([1n])).to.be.rejectedWith(
        'Item does not exist'
      )

      const events = await storage.getEvents.ItemDeleted()
      expect(events).to.have.lengthOf(1)
      expect((events[0].args as { id: bigint }).id).to.equal(1n)
    })

    it('Should fetch all items', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await storage.write.create(['value 1'])
      await storage.write.create(['value 2'])
      await storage.write.create(['value 3'])

      const [ids, values] = (await storage.read.fetchAll()) as [
        bigint[],
        string[]
      ]
      expect(ids).to.deep.equal([1n, 2n, 3n])
      expect(values).to.deep.equal(['value 1', 'value 2', 'value 3'])
    })

    it('Should handle items from different users separately', async function () {
      const { storage, owner, otherAccount, publicClient } =
        await loadFixture(deployStorageFixture)

      const storage1 = await hre.viem.getContractAt(
        'Storage',
        storage.address,
        { client: { wallet: owner } }
      )

      await storage1.write.create(['owner value'])

      const storage2 = await hre.viem.getContractAt(
        'Storage',
        storage.address,
        { client: { wallet: otherAccount } }
      )

      await storage2.write.create(['other value'])

      const ownerResult = await publicClient.readContract({
        address: storage.address,
        abi: storage.abi,
        functionName: 'fetchAll',
        account: owner.account.address
      })

      const otherResult = await publicClient.readContract({
        address: storage.address,
        abi: storage.abi,
        functionName: 'fetchAll',
        account: otherAccount.account.address
      })

      const [ownerIds, ownerValues] = ownerResult as [bigint[], string[]]
      const [otherIds, otherValues] = otherResult as [bigint[], string[]]

      expect(ownerIds).to.deep.equal([1n])
      expect(ownerValues).to.deep.equal(['owner value'])
      expect(otherIds).to.deep.equal([1n])
      expect(otherValues).to.deep.equal(['other value'])
    })
  })
})
