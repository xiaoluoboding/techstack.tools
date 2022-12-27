import API from '@/utils/api'

export function createBookmark(bookmarkCreate: BookmarkCreate) {
  return API.post<BookmarkRow[]>('/api/bookmark', bookmarkCreate)
}

export function deleteBookmark(bookmarkId: string) {
  return API.delete<BookmarkRow>(`/api/bookmark/${bookmarkId}`)
}

export function patchBookmark(bookmarkPatch: BookmarkPatch) {
  return API.patch<BookmarkRow>(
    `/api/bookmark/${bookmarkPatch.id}`,
    bookmarkPatch
  )
}

export function getBookmarkList() {
  return API.get<BookmarkRow[]>('/api/bookmark')
}

export function getBookmarkInfo() {
  return API.get<BookmarkRow>('/api/bookmark')
}
