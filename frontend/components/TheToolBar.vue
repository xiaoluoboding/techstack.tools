<template>
  <div class="h-10 mt-5 mb-2 flex items-center gap-1 justify-between">
    <!-- Filter -->
    <div v-if="displayFiltersBlock" class="flex items-center space-x-2">
      <div>Filter{{ filtersCount > 1 ? 's' : '' }}</div>
      <FilterLabel v-if="selectedCategory" @close="selectedCategory = null">
        {{ selectedCategory }}
      </FilterLabel>
      <FilterLabel v-if="q" @close="q = ''">
        {{ q }}
      </FilterLabel>
      <a
        href="/"
        class="ml-2 opacity-70 hover:opacity-100 inline-flex items-center gap-1"
        @click.prevent="clearFilters"
      >
        <UnoIcon class="i-carbon-filter-remove" />
        Clear filter{{ filtersCount > 1 ? 's' : '' }}
      </a>
    </div>
    <div v-else></div>

    <div class="mb-4">
      <a class="btn" :href="GITHUB_ISSUE_URL" rel="noopener" target="_blank">
        <UnoIcon class="i-carbon-add h-6 w-6"></UnoIcon>
        <span>Add Your Tools</span>
      </a>
    </div>
  </div>

  <!-- Sorter -->
  <div
    class="flex flex-col items-center justify-between min-h-18 sm:flex-row p-5 mb-4 rounded-lg card-bd card-bg text-primary"
  >
    <div class="flex space-x-2 items-center">
      <label>
        <span class="font-black text-3xl">
          {{ filterdBookmarkList.length }}
        </span>
        <span> tool{{ filterdBookmarkList.length > 1 ? 's' : '' }} found</span>
      </label>
    </div>
    <TheOrderBy
      v-show="!q"
      :order-by="orderBy"
      :sort-by="sortBy"
      @update:order-by="(v) => (orderBy = v)"
      @update:sort-by="(v) => (sortBy = v)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { GITHUB_ISSUE_URL } from '@/composables/constants'

const orderBy = ref('createdAt')
const sortBy = ref('desc')

const displayFiltersBlock = computed(() => selectedCategory.value || q.value)

const filtersCount = computed(() => {
  let count = 0
  if (selectedCategory.value) {
    count++
  }
  if (q.value) {
    count++
  }
  return count
})

function clearFilters() {
  selectedCategory.value = null
  q.value = null
}
</script>
