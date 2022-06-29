<template>
  <div
    class="flex items-center gap-4 justify-between w-full container mx-auto px-4 py-2 h-14"
  >
    <slot name="head" />
    <div class="flex" :class="isSearchOpen ? 'hidden' : ''">
      <a href="/" class="inline-flex text-base lg:text-2xl">
        <!-- fixed the darkmode bug -->
        <ClientOnly>
          <img class="my-auto h-6" src="/logo-dark.svg" v-if="isDark" />
          <img class="my-auto h-6" src="/logo-light.svg" v-else />
        </ClientOnly>
      </a>
    </div>

    <div class="flex gap-6 items-center">
      <NuxtLink to="#" @click="isShowNotifyForCollection = true"
        >Collection</NuxtLink
      >
      <button
        aria-label="Search"
        class="block md:hidden !outline-none text-xl h-1.2em my-auto"
        @click="toggleSearch()"
      >
        <carbon:search />
      </button>
      <a
        aria-label="GitHub"
        class="!outline-none text-xl h-1.2em my-auto hover:text-violet-300"
        href="https://github.com/xiaoluoboding/tech-stack.tools"
        target="_blank"
      >
        <carbon:logo-github />
      </a>

      <button
        aria-label="Toggle theme"
        class="!outline-none text-xl h-1.2em my-auto"
        @click="toggleDark()"
      >
        <ColorScheme placeholder="...">
          <carbon:moon v-if="isDark" />
          <carbon:sun v-else />
        </ColorScheme>
      </button>
      <ClientOnly>
        <button
          v-if="!isMobile()"
          class="btn-secondary"
          data-trick="Gotcha you"
          @click="isShowNotify = true"
        >
          Collect Wallet
        </button>
      </ClientOnly>
    </div>
    <slot name="tail" />
  </div>
  <TheNotify
    msg="😜 Gotcha You! This site is not a Web3 App."
    v-model:visible="isShowNotify"
    @close="isShowNotify = false"
  />
  <TheNotify
    msg="Collection feature will comming soon 🚀"
    v-model:visible="isShowNotifyForCollection"
    @close="isShowNotifyForCollection = false"
  />
</template>

<script setup lang="ts">
import { useDark } from '~/composables/useDark'
import { isMobile } from '~/utils/'

const { isDark, toggleDark } = useDark()

const isSearchOpen = ref(false)
const isShowNotify = ref(false)
const isShowNotifyForCollection = ref(false)

const toggleSearch = () => {}
</script>
