<template>
  <div
    class="app pb-16 relative bg-gray-100 dark:bg-slate-700 font-sans text-primary transition duration-300 ease-in-out"
  >
    <div
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
    </div>
    <div
      class="pt-10 pb-16 px-3 lg:px-10 lg:pt-24 lg:pb-32 bg-white dark:bg-slate-800 relative"
    >
      <div class="container mx-auto flex flex-col sm:flex-row justify-between">
        <div class="flex flex-wrap justify-between gap-y-5 w-full z-1">
          <!-- Hero -->
          <TheHero />
          <!-- Stats -->
          <TheStats
            class="hidden sm:block"
            :stats="{
              tools: allBookmarkList.length,
              categories: categoriesList.length,
              newsletters: newsletterWeeks
            }"
          />
        </div>
      </div>
      <!-- SVG Background -->
      <div class="text-gray-100 dark:text-slate-700 max-w-screen">
        <svg
          class="absolute -bottom-1px left-0 right-0 top-34 sm:top-50 lg:top-12 w-full pointer-events-none"
          preserveAspectRatio="none"
          fill="none"
          id="visual"
          viewBox="0 0 960 540"
          width="960"
          height="540"
        >
          <path
            class="fill-violet-300 z-1"
            d="M0 341L137 265L274 356L411 273L549 266L686 348L823 248L960 296L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
            style="
              transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s;
              transform: translateY(100px);
            "
          ></path>
          <path
            class="fill-violet-500 z-3"
            d="M0 475L137 449L274 477L411 472L549 484L686 492L823 473L960 439L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
            style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s"
          ></path>
          <path
            d="M0 496L137 498L274 432L411 475L549 464L686 493L823 446L960 493L960 541L823 541L686 541L549 541L411 541L274 541L137 541L0 541Z"
            class="fill-gray-100 dark:fill-slate-700 z-4 transform translate-y-10"
            style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s"
          ></path>
        </svg>
      </div>
    </div>

    <div
      class="w-full mx-auto h-[60vh] flex items-center justify-center"
      v-if="isLoadingBookmark"
    >
      <LoadingSpinner />
    </div>
    <div
      v-else
      class="w-full max-w-390 px-4 mx-auto mt-16 pt-8 grid grid-cols-1 lg:grid-cols-[18em_1fr] gap-4"
    >
      <!-- Sidebar -->
      <TheDrawer
        :open="isDrawerOpen"
        :drawer-class="'bg-gray-100 dark:bg-slate-800 p-4 w-20em border-r h-full overflow-auto'"
        @close="isDrawerOpen = false"
      >
        <div class="p-4">
          <button
            aria-label="Close Drawer"
            class="absolute top-0 right-0 !outline-none text-2xl block lg:hidden"
            @click="isDrawerOpen = false"
          >
            <carbon:close />
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

      <!-- The main -->
      <main class="mx-auto w-full z-10">
        <!-- The Tool Bar -->
        <div
          class="h-10 mt-4 mb-4 flex items-center gap-1 sm:justify-between w-80 sm:w-full mx-auto"
        >
          <ClientOnly>
            <GlobalSearch ref="searchEl" v-model:search="q" />
          </ClientOnly>

          <!-- Action -->
          <div class="flex items-center justify-end flex-1 space-x-4">
            <button
              aria-label="Toggle theme"
              class="!outline-none text-xl h-1.2em my-auto"
              @click="toggleQRCode()"
            >
              <mdi:qrcode-plus v-if="isShowQRCode" />
              <mdi:qrcode-remove v-else />
            </button>
            <a
              class="btn"
              :href="GITHUB_ISSUE_URL"
              rel="noopener"
              target="_blank"
            >
              <carbon:add class="h-6 w-6" />
              <span>Suggest a Change</span>
            </a>
          </div>
        </div>

        <!-- Sorter -->
        <div
          class="grid grid-cols-2 min-h-18 sm:flex-row p-5 mb-4 rounded-lg card-bd card-bg text-primary w-80 sm:w-full mx-auto"
        >
          <!-- Filter -->
          <div v-if="displayFiltersBlock" class="flex items-center space-x-2">
            <div>Filter{{ filtersCount > 1 ? 's' : '' }}</div>
            <FilterLabel
              v-if="selectedCategory"
              @close="selectedCategory = null"
            >
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
              <carbon:filter-remove />
              Clear filter{{ filtersCount > 1 ? 's' : '' }}
            </a>
          </div>
          <div v-else></div>

          <div class="flex space-x-2 items-center justify-end">
            <label>
              <span class="font-black text-3xl">
                {{ filterdBookmarkList.length }}
              </span>
              <span>
                tool{{ filterdBookmarkList.length > 1 ? 's' : '' }} found</span
              >
            </label>
          </div>

          <!-- <TheOrderBy
            class="flex justify-end"
            v-if="!q"
            :order-by="orderBy"
            :sort-by="sortBy"
            @update:order-by="(v) => (orderBy = v)"
            @update:sort-by="(v) => (sortBy = v)"
          />
          <div v-else></div> -->
        </div>

        <!-- Bookmark Card -->
        <div
          class="grid sm:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center mt-4"
        >
          <div v-for="card in paginatedBookmarkList" :key="card.id">
            <BookmarkCard
              :meta="card"
              :qrcode="globalStore.isShowQRCode"
              class="card-bd hover:shadow-2xl"
            >
              <div
                class="inset-0 absolute -z-1 rounded-xl inset-0 bg-transparent"
                :class="selectedBackground"
              />
            </BookmarkCard>
            <div class="space-x-4 flex justify-end mt-2">
              <div class="flex items-center">
                <a
                  class="text-lg font-bold"
                  href="#"
                  @click="handleShareToTwitter(card.link)"
                >
                  <img src="/twitter-logo.svg" class="h-5 w-5" />
                </a>
              </div>
              <div class="flex items-center">
                <a
                  class="text-lg font-bold"
                  :href="`${BOOKMARK_STYLE_URL}${encodeURIComponent(
                    card.link
                  )}`"
                  target="_blank"
                >
                  <img src="/bookmark-logo.svg" class="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Pagination
          class="w-full mt-10"
          v-if="filterdBookmarkList.length > PAGE_SIZE"
          :total="filterdBookmarkList.length"
          :page-size="PAGE_SIZE"
          @change="(val) => (pageCount = val)"
        />
      </main>
    </div>
  </div>
  <TheFooter />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import Fuse from 'fuse.js/dist/fuse.basic.esm'

import { useGlobalStore } from '@/stores/global'
import { useUserStore } from '@/stores/user'
import { useNotionStore } from '@/stores/notion'
import { useBookmarkStore } from '@/stores/bookmark'

import { login, getUserInfo, getBookmarkList } from '@/services'
import {
  GITHUB_ISSUE_URL,
  PAGE_SIZE,
  BOOKMARK_STYLE_URL,
  TWITTER_SHARE_URL
} from '@/composables/constants'

const globalStore = useGlobalStore()
const userStore = useUserStore()
const notionStore = useNotionStore()
const bookmarkStore = useBookmarkStore()
const route = useRoute()

const fuseOptions = {
  threshold: 0.2,
  keys: ['link', 'title', 'author', 'publisher', 'description', 'tag']
}

const allBookmarkList = ref<Bookmark[]>([])
const q = ref('')
const orderBy = ref('createdAt')
const sortBy = ref('desc')
const isDrawerOpen = ref(false)
const selectedCategory = ref<string | null>()
const pageCount = ref(1)
const isLoadingBookmark = ref(false)
const newsletterWeeks = ref(0)
const isReloadBookmark = ref(false)
const selectedBackground = `bg-gradient-to-br from-pink-300 via-violet-300 to-indigo-400`

const categoriesList = computed(() => bookmarkStore.bookmarkTagList)

const fuse = computed(() => {
  const fuseIndex = Fuse.createIndex(fuseOptions.keys, allBookmarkList.value)
  return new Fuse(allBookmarkList.value, fuseOptions, fuseIndex)
})

const filterdBookmarkList = computed(() => {
  let list = allBookmarkList.value

  if (q.value) {
    list = fuse.value.search(q.value).map((r) => r.item)
  }
  if (selectedCategory.value) {
    list = list.filter((item) => {
      return (
        item.tag.findIndex((item) => item.name === selectedCategory.value) !==
        -1
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

const isShowQRCode = computed(() => globalStore.isShowQRCode)

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

function clearFilters() {
  selectedCategory.value = null
  q.value = null
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

const fetchNotionDatabase = async () => {
  // const { data } = await getBookmarkList()

  // initial the notion database
  // if (data.length === 3) {
  //   real logic
  // }
  await notionStore.fetchPage()
}

watch([q, orderBy, sortBy, selectedCategory], syncURL, { deep: true })

function syncURL() {
  const url = route.path
  const queries = []

  if (q.value) {
    queries.push(`q=${q.value}`)
  }
  // if (orderBy.value !== 'createdAt') {
  //   queries.push(`orderBy=${orderBy.value}`)
  // }
  // if (sortBy.value !== 'desc') {
  //   queries.push(`sortBy=${sortBy.value}`)
  // }
  if (selectedCategory.value) {
    queries.push(`category=${selectedCategory.value}`)
  }
  let query = queries.join('&')
  if (query) {
    query = '?' + query
  }

  window.history.pushState('', '', `${url}${query}`)
}

const handleShareToTwitter = async (url: string) => {
  const host = encodeURIComponent(window.location.href)
  let text = encodeURIComponent(
    `Found a valuable tool for developers、creators from ${window.location.href}. Check it out! `
  )
  text += encodeURIComponent(`#webdev #tools `)
  const tweetShareLink = `${TWITTER_SHARE_URL}text=${text}%0A&via=TechStackTools&url=${encodeURIComponent(
    url
  )}`
  const link = document.createElement('a')
  link.href = tweetShareLink
  link.target = '_blank'
  link.click()
}

const toggleQRCode = () => {
  globalStore.setGlobalState({ isShowQRCode: !globalStore.isShowQRCode })
}

const handleRefreshBookmark = () => {
  isReloadBookmark.value = true
  nextTick(() => {
    isReloadBookmark.value = false
  })
}

onMounted(async () => {
  isLoadingBookmark.value = true
  await loginAsGuest()

  // await fetchNotionDatabase()

  await initBookmarkList()

  newsletterWeeks.value = Math.round(
    dayjs().diff(dayjs('2021-11-25'), 'weeks', true)
  )

  isLoadingBookmark.value = false
})
</script>

<style>
.gradient-border {
  backdrop-filter: blur(10px);
  position: relative;
}

.gradient-border::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(
    135deg,
    rgba(31, 54, 77, 0.66),
    rgba(31, 54, 77, 0.66) 25%,
    #8b5cf6 50%,
    #ede9fe 100%
  );
  background-position: 0 0;
  background-size: 400% auto;
  transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
  opacity: 0.5;
  border-radius: 12px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 10;
}

.gradient-border:hover::before {
  background-position: -50% 0;
  padding: 3px;
  opacity: 1;
}
</style>
