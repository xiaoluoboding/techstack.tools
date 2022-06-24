import { defineStore } from 'pinia'
import axios from 'axios'
import { pick } from 'lodash-es'

import { getNotionDatabase, createBookmark } from '@/services'

const STORE_ID = 'notion'

const API_PREFIX = 'https://metafy.vercel.app/api?url='

const conventBookmark = async (row: any): Promise<BookmarkCreate> => {
  if (row && row.id) {
    const link = row.properties.URL.url
    const tag = row.properties.Tag.multi_select

    let bookmarkCreate: BookmarkCreate = null

    if (link) {
      let bookmarkMeta: BookmarkMeta = null
      try {
        bookmarkMeta = ((await axios.get(`${API_PREFIX}${link}`)) as any).data

        bookmarkCreate = {
          link,
          title: bookmarkMeta.title || '',
          description: bookmarkMeta.description || '',
          author: bookmarkMeta.author || '',
          publisher: bookmarkMeta.publisher || '',
          image: bookmarkMeta.image || '',
          logo: bookmarkMeta.logo || '',
          tag: JSON.stringify(tag)
        }
      } catch (error) {
        console.log(error)
        return null
      }

      return pick(bookmarkCreate, [
        'link',
        'title',
        'description',
        'author',
        'publisher',
        'image',
        'logo',
        'tag'
      ])
    }
  } else {
    return null
  }
}

export const useNotionStore = defineStore({
  id: STORE_ID,

  state: (): NotionState => ({
    databaseMap: new Map()
  }),

  getters: {
    toolList(state: NotionState): any[] {
      return Array.from(state.databaseMap.values())
    }
  },

  actions: {
    addRow(payload) {
      this.databaseMap.set(payload.id, payload)
    },

    async fetchPage() {
      const { data } = await getNotionDatabase()
      if (data && data.length > 0) {
        for (const col of data) {
          if (col && col.id) {
            this.addRow(col)
            this.addBookmark(col)
          }
        }
      }
    },

    async addBookmark(payload: any) {
      const bookmark = await conventBookmark(payload)

      if (bookmark && bookmark.title) {
        createBookmark(bookmark)
      }
    }
  }
})
