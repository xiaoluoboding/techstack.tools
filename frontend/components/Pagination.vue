<template>
  <ol class="flex justify-center space-x-1 font-medium">
    <li>
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded"
        @click="handlePrev"
      >
        <carbon:chevron-left />
      </button>
    </li>

    <li v-if="activePage > 4 && pages > 7">
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded"
        @click="handleChangePage(1)"
      >
        1
      </button>
    </li>

    <li v-if="activePage > 4 && pages > 7">
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded"
        @click="handlePrevByStep"
        @mouseenter="leftEnter = true"
        @mouseleave="leftEnter = false"
      >
        <mdi:chevron-double-left v-if="leftEnter" />
        <carbon:overflow-menu-horizontal v-else />
      </button>
    </li>

    <template v-for="item in pageRange">
      <li>
        <button
          class="block w-8 h-8 leading-8 text-center rounded"
          :class="{
            'border-violet-500 bg-violet-500 text-white': activePage === item
          }"
          @click="handleChangePage(item)"
        >
          {{ item }}
        </button>
      </li>
    </template>

    <li v-if="activePage < pages - STEP + 1">
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded"
        @click="handleNextByStep"
        @mouseenter="rightEnter = true"
        @mouseleave="rightEnter = false"
      >
        <mdi:chevron-double-right v-if="rightEnter" />
        <carbon:overflow-menu-horizontal v-else />
      </button>
    </li>

    <li v-if="activePage < pages - STEP + 1">
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded"
        @click="handleChangePage(pages)"
      >
        {{ pages }}
      </button>
    </li>

    <li>
      <button
        class="inline-flex items-center justify-center w-8 h-8 rounded"
        @click="handleNext"
      >
        <carbon:chevron-right />
      </button>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { useScrollToTop } from '@/composables/useScrollToTop'

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits<{ (e: 'change', number): void }>()

const { scrollToTop } = useScrollToTop()

const STEP = 5

const activePage = ref(1)
const leftEnter = ref(false)
const rightEnter = ref(false)
const pages = computed(() => Math.ceil(props.total / props.pageSize))
const pageRange = computed(() => {
  const range = []
  for (let i = 1; i <= pages.value; ++i) {
    range.push(i)
  }

  if (activePage.value < STEP) {
    return range.slice(0, STEP)
  } else if (activePage.value > pages.value - STEP) {
    return range.slice(pages.value - STEP, pages.value)
  } else {
    return range.slice(activePage.value - 3, activePage.value + 2)
  }
})

const handleChangePage = (item) => {
  activePage.value = item
  emit('change', activePage.value)
  scrollToTop()
}

const handleNext = () => {
  return handleChangePage(Math.min(pages.value, activePage.value + 1))
}

const handlePrev = () => {
  handleChangePage(Math.max(1, activePage.value - 1))
}

const handlePrevByStep = () => {
  const page = activePage.value - STEP > 1 ? activePage.value - STEP : 1
  handleChangePage(page)
}

const handleNextByStep = () => {
  const page =
    activePage.value + STEP < pages.value
      ? activePage.value + STEP
      : pages.value
  handleChangePage(page)
}

watch(
  () => props.total,
  (newVal) => {
    handleChangePage(1)
  }
)
</script>
