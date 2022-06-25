<template>
  <div>
    <dl class="flex gap-4 flex-wrap md:gap-8 mt-auto h-full font-mono">
      <div class="flex-col space-y-2 p-4 rounded-md">
        <span
          class="font-normal leading-6 text-lg sm:mt-2 sm:text-lg sm:capitalize"
          aria-hidden="true"
          >Total</span
        >
        <dd
          class="text-4xl font-black text-neon leading-none sm:text-6xl"
          aria-describedby="item-1"
        >
          {{ stats.tools }}
        </dd>
        <dt
          id="item-1"
          class="font-normal leading-6 text-lg sm:mt-2 sm:text-lg sm:capitalize"
        >
          tools
        </dt>
      </div>
      <div class="flex-col space-y-2 p-4">
        <span
          class="font-normal leading-6 text-lg sm:mt-2 sm:text-lg sm:capitalize"
          aria-hidden="true"
          >Total</span
        >
        <dd class="text-4xl font-black text-neon leading-none sm:text-6xl">
          {{ stats.categories }}
        </dd>
        <dt
          class="font-medium leading-6 text-lg sm:mt-2 sm:text-lg sm:capitalize"
        >
          categories
        </dt>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: {
    tools: number
    categories: number
  }
}>()
</script>
