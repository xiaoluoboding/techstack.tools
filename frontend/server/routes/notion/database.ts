import { Client } from '@notionhq/client'
import dayjs from 'dayjs'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const notion = new Client({ auth: config.NOTION_KEY })

  const databaseId = config.NOTION_DATABASE_ID

  let data: any[] = []

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
        ],
        filter: {
          property: 'Date',
          date: {
            after: dayjs().subtract(7, 'day').format('YYYY-MM-DD')
          }
        }
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
})
