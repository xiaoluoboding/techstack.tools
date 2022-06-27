<template>
  <div
    class="flex items-center gap-4 justify-between w-full container mx-auto px-4 py-2 h-14"
  >
    <slot name="head" />
    <div class="flex" :class="isSearchOpen ? 'hidden' : ''">
      <a href="/" class="inline-flex text-base lg:text-2xl">
        <span class="my-auto ml-1 pt-0.5"> TechStack Tools </span>
      </a>
    </div>

    <div class="flex gap-6 items-center">
      <NuxtLink to="/about">Weekly</NuxtLink>
      <NuxtLink to="/about">Newsletters</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <button
        aria-label="Search"
        class="block md:hidden !outline-none text-xl h-1.2em my-auto"
        @click="toggleSearch()"
      >
        <carbon:search />
      </button>
      <a
        aria-label="GitHub"
        class="!outline-none text-xl h-1.2em my-auto"
        href="https://github.com/xiaoluoboding/tech-stack.tools"
        target="_blank"
      >
        <carbon:logo-github />
      </a>
      <button
        aria-label="Toggle theme"
        class="!outline-none text-xl h-1.2em my-auto"
        @click="toggleQRCode()"
      >
        <mdi:qrcode-plus v-if="isShowQRCode" />
        <mdi:qrcode-remove v-else />
      </button>
      <button
        aria-label="Toggle theme"
        class="!outline-none text-xl h-1.2em my-auto"
        @click="toggleDark()"
      >
        <carbon:moon v-if="isDark" />
        <carbon:sun v-else />
      </button>
      <button
        class="btn-secondary"
        data-trick="Gotcha you"
        @click="isShowNotify = true"
      >
        Collect Wallet
      </button>
    </div>
    <slot name="tail" />
  </div>
  <TheNotify
    msg="😜 Gotcha You! This site is not a Web3 App."
    v-model:visible="isShowNotify"
    @close="isShowNotify = false"
  />
</template>

<script setup lang="ts">
import { useDark } from '~/composables/useDark'
import { useGlobalState } from '@/stores/global'

const { isDark, toggleDark } = useDark()
const globalState = useGlobalState()

const isSearchOpen = ref(false)
const isShowNotify = ref(false)

const isShowQRCode = computed(() => globalState.isShowQRCode)
const toggleSearch = () => {}

const toggleQRCode = () => {
  globalState.setGlobalState({ isShowQRCode: !globalState.isShowQRCode })
}
</script>
