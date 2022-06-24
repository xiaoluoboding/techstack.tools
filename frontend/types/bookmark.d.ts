interface BookmarkRow {
  id: string

  createTs: Timestamp
  updateTs: Timestamp

  link: string
  title: string
  description: string
  author: string
  publisher: string
  image: string
  logo: string
  tag: string
}

interface BookmarkCreate {
  link: string
  title: string
  description: string
  author: string
  publisher: string
  image: string
  logo: string
  tag: string
}

interface BookmarkDelete {
  id: string
}

interface BookmarkPatch {
  id: string

  author?: string
  description?: string
  image?: string
  logo?: string
  publisher?: string
  title?: string
}

interface BookmarkMeta {
  auto: boolean
  author: string | null
  date: boolean
  description: string | null
  image: string | null
  logo: string | null
  lang: string | null
  publisher: string | null
  title: string | null
  video: boolean
}

interface BookmarkTag {
  id: string
  color: string
  name: string
}

interface Bookmark extends BookmarkRow {
  tag: Array<BookmarkTag>
}

interface BookmarkState {
  bookmarkMap: Map<Bookmark.id, Bookmark>
  bookmarkList: Bookmark[]
}
