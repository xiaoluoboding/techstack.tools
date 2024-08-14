<script setup lang="ts">
import { RiCloseLine } from '@remixicon/vue'
</script>

<template>
  <span
    class="inline-flex items-center px-3 py-1 card-bd rounded-full text-sm select-none"
  >
    <slot />
    <RiCloseLine
      class="text-lg ml-2 -mr-1 opacity-50 hover:opacity-100 cursor-pointer"
      @click.native="$emit('close')"
    />
  </span>
</template>
