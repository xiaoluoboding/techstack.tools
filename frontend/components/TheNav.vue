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
      <NuxtLink to="/about">Weekly Newsletters</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <button
        aria-label="Search"
        class="block md:hidden !outline-none text-xl h-1.2em my-auto"
        @click="toggleSearch()"
      >
        <UnoIcon class="i-carbon-search" />
      </button>
      <a
        aria-label="GitHub"
        class="!outline-none text-xl h-1.2em my-auto"
        href="https://github.com/xiaoluoboding/tech-stack.tools"
        target="_blank"
      >
        <UnoIcon class="i-carbon-logo-github" />
      </a>
      <button
        aria-label="Toggle theme"
        class="!outline-none text-xl h-1.2em my-auto"
        @click="toggleDark()"
      >
        <UnoIcon class="dark:i-carbon-moon i-carbon-sun" />
      </button>
      <button class="btn-secondary">Collect Wallet</button>
    </div>
    <slot name="tail" />
  </div>
</template>

<script setup lang="ts">
import { useDark } from '~/composables/useDark'

const { toggleDark } = useDark()

const isSearchOpen = ref(false)
const toggleSearch = () => {}
</script>
