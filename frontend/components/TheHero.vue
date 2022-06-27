<template>
  <div class="text-left px-4 flex flex-col justify-center text-primary">
    <h1
      class="text-6xl sm:text-5xl md:text-6xl pb-1 mb-2 md:mb-4 overflow-ellipsis overflow-hidden"
    >
      Explore
      <span class="text-neon">Tech Stack</span> Tools
    </h1>
    <div class="py-4 space-y-2">
      <p class="text-base sm:text-lg md:text-2xl max-w-3xl">
        Discover our curated list of devtools to
        <span class="text-neon">supercharge</span> your next project.
      </p>
      <p class="text-base sm:text-lg md:text-2xl max-w-3xl">
        Subscribe our front-end tech stack
        <span class="text-neon">weekly</span>, Join 500+ readers.
      </p>
    </div>
    <div class="max-w-xl mt-4 text-left space-x-4">
      <a :href="GITHUB_ISSUE_URL" rel="noopener" target="_blank" class="btn-lg">
        <carbon:logo-github class="text-xl" /> Contribute on GitHub
      </a>
      <a
        :href="NEWSLETTERS_URL"
        rel="noopener"
        target="_blank"
        class="btn-secondary-lg"
      >
        <carbon:email class="text-xl" /> Subscribe newsletters
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GITHUB_ISSUE_URL, NEWSLETTERS_URL } from '@/composables/constants'
</script>
