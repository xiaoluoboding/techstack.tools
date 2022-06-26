<template>
  <div class="flex shadow-sm w-full max-w-xl flex-auto space-x-2">
    <label
      class="relative flex-1"
      :class="isSearchOpen ? 'flex' : 'hidden md:flex'"
    >
      <input
        ref="searchEl"
        type="search"
        aria-label="Search"
        class="block bg-slate-200/40 dark:bg-slate-600/50 w-full py-1 px-3 h-10 text-base leading-6 placeholder-slate-400 dark:placeholder-slate-200 transition duration-150 ease-in-out appearance-none md:pr-10 rounded-lg focus:ring-3 focus:ring-violet-500 focus:ring-opacity-50 focus:outline-none focus:placeholder-violet-700 focus:dark:placeholder-violet-300 sm:flex-1"
        placeholder="Search a tool (link, category, etc.)"
        v-model="searchModel"
        @input="handleInput"
      />
      <span
        class="absolute hidden px-2 text-slate opacity-50 bg-slate-200 dark:bg-slate-800 rounded-md md:inline-block text-md top-2 bottom-2 right-2"
        >/</span
      >
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { debounce } from 'lodash-es'

import { isMobile } from '~/utils/index'

const props = defineProps<{ search: string }>()
const emit = defineEmits<{ (e: 'update:search', v: string): void }>()

const searchEl = ref<HTMLInputElement>()
const isSearchOpen = ref(false)
const searchModel = ref(props.search)

async function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value

  if (isSearchOpen.value) {
    await nextTick()
    focusSearchInput()
  }
}

const handleInput = debounce((e: InputEvent) => {
  emit('update:search', searchModel.value)
}, 300)

function focusSearchInput() {
  searchEl.value?.focus()
}

watch(
  () => props.search,
  (newVal) => {
    searchModel.value = newVal
  }
)

onMounted(() => {
  useEventListener('keypress', (event) => {
    // Add `/` shortcut for search input only if not already focused
    if (event.key === '/' && !(event.target instanceof HTMLInputElement)) {
      event.preventDefault()
      focusSearchInput()
    }
  })

  // In case of desktop, auto focus the search input
  if (!isMobile()) {
    focusSearchInput()
  }
})
</script>
