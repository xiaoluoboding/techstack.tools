<template>
  <div class="app pb-16 relative bg-gray-100 dark:bg-slate-700 font-sans">
    <div
      class="relative bg-white dark:bg-slate-800 !bg-glass dark:text-slate-50 shadow w-full sticky top-0 z-50 border-none"
    >
      <TheNav ref="searchEl" :search="q"> </TheNav>
    </div>
    <div
      class="pt-10 pb-16 px-3 lg:px-10 lg:pt-24 lg:pb-32 bg-white dark:bg-slate-800 relative"
    >
      <div class="container mx-auto flex flex-col sm:flex-row justify-between">
        <div class="flex flex-wrap justify-between gap-y-5 w-full z-1">
          <!-- Hero -->
          <TheHero />
          <!-- Stats -->
          <!-- <TheStats
            :modules="state.modules"
            :stats="state.stats"
          /> -->
        </div>
      </div>
      <!-- SVG Background -->
      <div class="text-gray-100 dark:text-slate-700">
        <svg
          class="absolute -bottom-1px left-0 right-0 top-4 w-full pointer-events-none z-0"
          preserveAspectRatio="none"
          fill="none"
          id="visual"
          viewBox="0 0 960 540"
          width="960"
          height="540"
        >
          <path
            class="fill-violet-300"
            d="M0 341L137 265L274 356L411 273L549 266L686 348L823 248L960 296L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
            style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s"
          ></path>
          <path
            class="fill-violet-500"
            d="M0 365L137 395L274 383L411 405L549 347L686 359L823 367L960 405L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
            style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s"
          ></path>
          <path
            class="fill-violet-700"
            d="M0 475L137 449L274 477L411 472L549 484L686 492L823 473L960 439L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
            style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s"
          ></path>
        </svg>
      </div>
    </div>

    <div class="w-full container px-4 mx-auto pt-8 mt-36">
      <!-- Sidebar -->
      <TheDrawer
        :open="isDrawerOpen"
        :drawer-class="'bg-gray-100 dark:bg-secondary-black p-4 w-20em border-r nuxt-border h-full overflow-auto'"
        @close="isDrawerOpen = false"
      >
        <div class="p-4 relative">
          <button
            aria-label="Close Drawer"
            class="absolute top-0 right-0 !outline-none text-2xl block lg:hidden"
            @click="isDrawerOpen = false"
          >
            <UnoIcon class="i-carbon-close" />
          </button>
          <FilterButtons
            title="Categories"
            :items="categoriesList"
            :selected-item="selectedCategory"
            @toggle="toggleCategory"
          >
          </FilterButtons>
        </div>
      </TheDrawer>

      <main class="mx-auto">
        <div class="h-10 -mt-5 mb-2 flex items-center gap-1"></div>
        <div
          class="flex flex-col items-center justify-between min-h-18 sm:flex-row p-5 mb-4 rounded-lg card-bd card-bg text-primary"
        >
          <div>
            <span class="font-black text-2xl">{{
              filterdBookmarkList.length
            }}</span>
            tool{{ filterdBookmarkList.length > 1 ? 's' : '' }} found
          </div>
          <TheOrderBy
            v-show="!q"
            :order-by="orderBy"
            :sort-by="sortBy"
            @update:order-by="(v) => (orderBy = v)"
            @update:sort-by="(v) => (sortBy = v)"
          />
        </div>

        <!-- Bookmark Card -->
        <div
          class="grid lg:grid-cols-3 gap-x-6 gap-y-8 place-items-center mt-8"
        >
          <template v-for="card in paginatedBookmarkList" :key="card.id">
            <BookmarkCard :meta="card" qrcode class="card-bd hover:shadow-2xl">
              <div
                class="inset-0 absolute -z-1 rounded-xl inset-0 bg-transparent"
                :class="selectedBackground"
              />
            </BookmarkCard>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import { useUserStore } from '@/stores/user'
import { useNotionStore } from '@/stores/notion'
import { useBookmarkStore } from '@/stores/bookmark'

import { login, getUserInfo, getBookmarkList } from '@/services'

const PAGE_SIZE = 30

const userStore = useUserStore()
const notionStore = useNotionStore()
const bookmarkStore = useBookmarkStore()

const allBookmarkList = ref<Bookmark[]>([])
const q = ref('')
const orderBy = ref('createdAt')
const sortBy = ref('desc')
const isDrawerOpen = ref(false)
const selectedCategory = ref<string | null>()
const pageCount = ref(1)
const selectedBackground = `bg-gradient-to-br from-green-300 via-blue-500 to-purple-600`

const categoriesList = computed(() => bookmarkStore.bookmarkTagList)

const filterdBookmarkList = computed(() => {
  let list = allBookmarkList.value
  if (selectedCategory.value) {
    list = list.filter((item) => {
      return (
        item.tag.findIndex((item) => item.id === selectedCategory.value) !== -1
      )
    })
  }
  return list
})

const paginatedBookmarkList = computed(() =>
  filterdBookmarkList.value.slice(
    PAGE_SIZE * (pageCount.value - 1),
    PAGE_SIZE * pageCount.value
  )
)

const loginAsGuest = async () => {
  await login('chris.damon@demo.com', '123456')
  const { data: user } = await getUserInfo()
  if (user) {
    userStore.setCurrentUser(user)
    console.log('login success')
  }
}

function toggleCategory(category) {
  if (selectedCategory.value === category) {
    selectedCategory.value = null
    return
  }
  selectedCategory.value = category
}

const initBookmarkList = async () => {
  if (bookmarkStore.bookmarkList.length === 0) {
    const { data } = await getBookmarkList()

    allBookmarkList.value = data.map((item) => {
      return {
        ...item,
        tag: JSON.parse(item.tag)
      }
    })
    bookmarkStore.setBookmarkState({
      bookmarkList: allBookmarkList.value
    })
  } else {
    allBookmarkList.value = bookmarkStore.bookmarkList
  }
}

onMounted(async () => {
  await loginAsGuest()

  await initBookmarkList()

  // await notionStore.fetchPage()
})
</script>

<style></style>
