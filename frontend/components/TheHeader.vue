<template>
  <header
    class="relative bg-white dark:bg-slate-800 !bg-glass dark:text-slate-50 shadow w-full sticky top-0 z-50 border-none"
  >
    <TheNav>
      <template #head>
        <button
          aria-label="Toggle Drawer"
          class="!outline-none text-xl h-1.2em my-auto block lg:hidden"
          @click="isDrawerOpen = true"
        >
          <carbon:menu />
        </button>
      </template>
    </TheNav>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isDrawerOpen = ref(false)
</script>
