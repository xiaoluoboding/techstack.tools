<template>
  <div>
    <h2 class="text-3xl font-extrabold text-primary">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-sm text-gray-700 dark:text-gray-300 mb-1">
      {{ subtitle }}
    </p>

    <div
      class="flex space-x-2 py-4 overflow-x-auto sm:flex-wrap sm:justify-center"
    >
      <button
        v-for="item of items"
        :key="item.id"
        type="button"
        :aria-label="item.name"
        class="px-4 py-3 mb-2 text-left flex items-center rounded-lg cursor-pointer card-bd card-bg text-primary transition-colors duration-150 ease-in-out hover:border-slate-500"
        :class="{ 'border-slate-500': selectedItem === item.id }"
        @click="$emit('toggle', item.id)"
      >
        <div class="overflow-hidden truncate">
          {{ item.name }} ({{ item.counts }})
        </div>
        <slot name="badge" v-bind="item" />
        <div class="flex-auto" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  id: string
  name: string
  color: string
  counts: number
}

defineProps<{
  title: string
  subtitle?: string
  items: Item[]
  selectedItem?: string | null
}>()
</script>
