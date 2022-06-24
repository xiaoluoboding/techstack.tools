import { defineStore } from 'pinia'
import { groupBy, sumBy } from 'lodash-es'

export const useBookmarkStore = defineStore({
  id: 'bookmark',

  state: (): BookmarkState => ({
    bookmarkMap: new Map(),
    bookmarkList: []
  }),

  getters: {
    bookmarkTagList(state: BookmarkState) {
      const tagMap = new Map()
      const tagList = this.bookmarkList.map((item) => item.tag).flat(1)
      const groupedTagList = groupBy(tagList, (tag) => tag.name)

      for (const tag of tagList) {
        if (tag.id && !tagMap.has(tag.id)) {
          tag.counts = groupedTagList[tag.name].length
          tagMap.set(tag.id, tag)
        }
      }

      return Array.from(tagMap.values()).sort((a, b) => b.counts - a.counts)
    }
  },

  actions: {
    setBookmarkState(payload: Partial<BookmarkState>) {
      Object.assign(this, payload)
    },
    setBookmark(bookmark: Bookmark) {
      if (!this.bookmarkMap.has(bookmark.id)) {
        this.bookmarkMap.set(bookmark.id, bookmark)
      }
    }
  }
})
