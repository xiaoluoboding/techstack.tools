import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
  id: 'global',

  state: () => ({
    isShowQRCode: true
  }),

  actions: {
    setGlobalState(payload) {
      Object.assign(this, payload)
    }
  }
})
