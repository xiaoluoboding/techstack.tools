import API from '@/utils/api'

export function getNotionDatabase() {
  return API.get<Record<string, any>[]>('/notion/database')
}
