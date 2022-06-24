type MetaId = string | -1

type NotionDatabaseMeta = {
  name: string
  url: string
  tag: string[]
}

interface NotionState {
  databaseMap: Map<MetaId, NotionDatabaseMeta>
}
