import { defineStore } from 'pinia'

export const useGlobalState = defineStore({
  id: 'global',

  state: () => ({
    isShowQRCode: false
  }),

  actions: {
    setGlobalState(payload) {
      Object.assign(this, payload)
    }
  }
})
