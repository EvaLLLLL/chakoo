import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Storage', function () {
  async function deployStorageFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const Storage = await ethers.getContractFactory('Storage')
    const storage = await Storage.deploy()

    return { storage, owner, otherAccount }
  }

  describe('Item Operations', function () {
    it('Should create an item', async function () {
      const { storage, owner } = await loadFixture(deployStorageFixture)
      const value = 'Test Item'

      await expect(storage.create(value))
        .to.emit(storage, 'ItemCreated')
        .withArgs(owner.address, 1, value)

      expect(await storage.read(1)).to.equal(value)
    })

    it('Should not create an item with empty value', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await expect(storage.create('')).to.be.revertedWith(
        'Value cannot be empty'
      )
    })

    it('Should read an existing item', async function () {
      const { storage } = await loadFixture(deployStorageFixture)
      const value = 'Test Item'

      await storage.create(value)
      expect(await storage.read(1)).to.equal(value)
    })

    it('Should fail to read non-existent item', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await expect(storage.read(1)).to.be.revertedWith('Item does not exist')
    })

    it('Should update an existing item', async function () {
      const { storage, owner } = await loadFixture(deployStorageFixture)
      const initialValue = 'Initial Value'
      const updatedValue = 'Updated Value'

      await storage.create(initialValue)
      await expect(storage.update(1, updatedValue))
        .to.emit(storage, 'ItemUpdated')
        .withArgs(owner.address, 1, updatedValue)

      expect(await storage.read(1)).to.equal(updatedValue)
    })

    it('Should fail to update non-existent item', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await expect(storage.update(1, 'New Value')).to.be.revertedWith(
        'Item does not exist'
      )
    })

    it('Should fail to update with empty value', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await storage.create('Initial Value')
      await expect(storage.update(1, '')).to.be.revertedWith(
        'Value cannot be empty'
      )
    })

    it('Should delete an existing item', async function () {
      const { storage, owner } = await loadFixture(deployStorageFixture)
      const value = 'Test Item'

      await storage.create(value)
      await expect(storage.remove(1))
        .to.emit(storage, 'ItemDeleted')
        .withArgs(owner.address, 1)

      await expect(storage.read(1)).to.be.revertedWith('Item does not exist')
    })

    it('Should fail to delete non-existent item', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      await expect(storage.remove(1)).to.be.revertedWith('Item does not exist')
    })
  })

  describe('Data Retrieval', function () {
    it('Should fetch all items for a user', async function () {
      const { storage } = await loadFixture(deployStorageFixture)
      const values = ['Item 1', 'Item 2', 'Item 3']

      // Create multiple items
      for (const value of values) {
        await storage.create(value)
      }

      const [ids, fetchedValues] = await storage.fetchAll()
      expect(fetchedValues).to.deep.equal(values)
      expect(ids).to.deep.equal([1, 2, 3])
    })

    it('Should handle deleted items in fetchAll', async function () {
      const { storage } = await loadFixture(deployStorageFixture)
      const values = ['Item 1', 'Item 2', 'Item 3']

      // Create items and delete one
      for (const value of values) {
        await storage.create(value)
      }
      await storage.remove(2)

      const [ids, fetchedValues] = await storage.fetchAll()
      expect(fetchedValues).to.deep.equal(['Item 1', '', 'Item 3'])
      expect(ids).to.deep.equal([BigInt(1), BigInt(0), BigInt(3)])
    })

    it('Should return empty arrays when user has no items', async function () {
      const { storage } = await loadFixture(deployStorageFixture)

      const [ids, values] = await storage.fetchAll()
      expect(ids).to.deep.equal([])
      expect(values).to.deep.equal([])
    })

    it('Should maintain separate storage for different users', async function () {
      const { storage, otherAccount } = await loadFixture(deployStorageFixture)

      await storage.create('Owner Item')
      await storage.connect(otherAccount).create('Other User Item')

      expect(await storage.read(1)).to.equal('Owner Item')
      expect(await storage.connect(otherAccount).read(1)).to.equal(
        'Other User Item'
      )
    })
  })
})
