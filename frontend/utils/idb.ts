import { openDB } from 'idb'

const storeKey = 'pinia-idb'

const db = openDB('tech-stack.tools', 1, {
  upgrade(db) {
    db.createObjectStore(storeKey)
  }
})

const get = async (key: string) => {
  return (await db).get(storeKey, key)
}
const set = async (key: string, val: any) => {
  return (await db).put(storeKey, val, key)
}

const del = async (key: string) => {
  return (await db).delete(storeKey, key)
}
const clear = async () => {
  return (await db).clear(storeKey)
}
const keys = async () => {
  return (await db).getAllKeys(storeKey)
}

export { db, get, set, del, clear, keys }
