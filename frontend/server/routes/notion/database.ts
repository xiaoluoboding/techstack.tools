import { Client } from '@notionhq/client'

const config = useRuntimeConfig()

export default async (req: any) => {
  const notion = new Client({ auth: config.NOTION_KEY })

  const databaseId = config.NOTION_DATABASE_ID

  let data = []

  const getPage = async (pageCursor?: string) => {
    try {
      const page = await notion.databases.query({
        database_id: databaseId,
        start_cursor: pageCursor,
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending'
          }
        ]
      })

      data = [...data, ...page.results]

      if (page.has_more && page.next_cursor) {
        await getPage(page.next_cursor)
      }
    } catch (error) {
      console.log(error)
    }
  }

  await getPage()

  return { data }
}
