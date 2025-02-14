import type { Payload, Where } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import type { NextRESTClient } from '../helpers/NextRESTClient.js'

import { initPayloadInt } from '../helpers/initPayloadInt.js'
let payload: Payload
let restClient: NextRESTClient

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

describe('folders', () => {
  beforeAll(async () => {
    ;({ payload, restClient } = await initPayloadInt(dirname))
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy()
    }
  })

  beforeEach(async () => {
    await payload.delete({
      collection: 'posts',
      depth: 0,
      where: {
        id: {
          exists: true,
        },
      },
    })
    await payload.delete({
      collection: 'folders',
      depth: 0,
      where: {
        id: {
          exists: true,
        },
      },
    })
  })

  describe('folder > subfolder querying', () => {
    it('should only create 1 root folder', async () => {
      await payload.create({
        collection: 'folders',
        data: {
          name: 'Folder 1',
        },
      })

      await payload.create({
        collection: 'folders',
        data: {
          name: 'Folder 2',
        },
      })

      const rootSubfoldersQuery = await payload.find({
        collection: 'folders',
        where: {
          isRoot: {
            equals: true,
          },
        },
      })

      expect(rootSubfoldersQuery.docs).toHaveLength(1)
      expect(rootSubfoldersQuery.docs[0].parentFolder).toBe(undefined)
    })

    it('should populate subfolders for root', async () => {
      await payload.create({
        collection: 'folders',
        data: {
          name: 'Folder 1',
        },
      })

      await payload.create({
        collection: 'folders',
        data: {
          name: 'Folder 2',
        },
      })

      const rootSubfoldersQuery = await payload.find({
        collection: 'folders',
        where: {
          isRoot: {
            equals: true,
          },
        },
      })

      expect(rootSubfoldersQuery.docs[0].documentsAndFolders.docs.length).toBe(2)
    })

    it('should populate subfolders for folder by ID', async () => {
      const parentFolder = await payload.create({
        collection: 'folders',
        data: {
          name: 'Parent Folder',
        },
      })
      const folderIDFromParams = parentFolder.id

      await payload.create({
        collection: 'folders',
        data: {
          name: 'Nested 1',
          parentFolder: folderIDFromParams,
        },
      })

      await payload.create({
        collection: 'folders',
        data: {
          name: 'Nested 2',
          parentFolder: folderIDFromParams,
        },
      })

      const parentFolderQuery = await payload.findByID({
        collection: 'folders',
        id: folderIDFromParams,
      })

      expect(parentFolderQuery.documentsAndFolders.docs.length).toBe(2)
    })
  })

  describe('folder > file querying', () => {
    it.skip('should populate files for folder by ID [POLYMORPHIC NOT IMPLEMENTED]', async () => {
      const parentFolder = await payload.create({
        collection: 'folders',
        data: {
          name: 'Parent Folder',
        },
      })
      const folderIDFromParams = parentFolder.id

      await payload.create({
        collection: 'posts',
        data: {
          title: 'Post 1',
          parentFolder: folderIDFromParams,
        },
      })

      await payload.create({
        collection: 'posts',
        data: {
          title: 'Post 2',
          parentFolder: folderIDFromParams,
        },
      })

      const parentFolderQuery = await payload.findByID({
        collection: 'folders',
        id: folderIDFromParams,
      })

      expect(parentFolderQuery.documentsAndFolders.docs.length).toBe(2)
    })

    it('should populate files for folder [ISOMORPHIC WORKAROUND]', async () => {
      const parentFolder = await payload.create({
        collection: 'folders',
        data: {
          name: 'Parent Folder',
        },
      })
      const folderIDFromParams = parentFolder.id

      await payload.create({
        collection: 'posts',
        data: {
          title: 'Post 1',
          parentFolder: folderIDFromParams,
        },
      })

      await payload.create({
        collection: 'posts',
        data: {
          title: 'Post 2',
          parentFolder: folderIDFromParams,
        },
      })

      const postsByParentQuery = await payload.find({
        collection: 'posts',
        where: {
          parentFolder: {
            equals: folderIDFromParams,
          },
        },
      })

      expect(postsByParentQuery.docs.length).toBe(2)
    })
  })
})
