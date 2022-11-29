<template>
  <figure
    class="web-bookmark-card relative inset-0 overflow-hidden shadow-lg hover:shadow-2xl text-left transition-all duration-300 ease-out max-w-screen w-80 sm:w-96 lg:w-200"
    :class="[bookmarkClass]"
    :key="url"
  >
    <slot />
    <a
      v-if="!isLoading"
      class="flex flex-wrap text-current no-underline hover:no-underline inset-0 backdrop-filter backdrop-blur-lg backdrop-saturate-[180%] filter drop-shadow-xl transition-all duration-300 ease-out z-10 !p-0"
      bg="!opacity-75 !white !dark:slate-800"
      :class="[cover === 'right' ? 'flex-row-reverse' : 'flex-row']"
      :href="metaData.link"
      target="_blank"
    >
      <div
        class="relative flex order-1 min-w-1/2 w-full basis-[0]"
        style="flex-grow: 999"
        :class="[qrcode ? 'justify-between px-3 py-2' : 'p-4']"
      >
        <div
          class="flex-1 flex flex-col justify-center font-serif"
          :class="qrcode && metaData.link ? 'has-qrcode' : 'w-full'"
        >
          <div
            class="items-center font-semibold line-clamp-1"
            :class="[horizontal ? 'text-sm' : 'text-base']"
            text="slate-800 dark:white"
          >
            <span>{{ metaData.title }}</span>
          </div>
          <div
            class="items-center mt-2 line-clamp-2"
            :class="[horizontal ? 'text-xs' : 'text-sm']"
            text="slate-800 dark:slate-400"
          >
            {{ metaData.description }}
          </div>
          <div class="items-center flex truncate mt-2">
            <div class="flex items-center truncate">
              <img
                v-if="metaData.logo"
                :src="metaData.logo"
                class="inline-block align-text-bottom mr-2 h-4 w-4"
                :class="[horizontal ? 'h-3.5 w-3.5' : 'h-4 w-4']"
              />
              <span
                class="truncate"
                :class="[horizontal ? 'text-xs' : 'text-sm']"
                text="slate-800 dark:slate-400"
              >
                {{ metaData.author || metaData.publisher || metaData.link }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="qrcode && metaData.link">
          <ClientOnly>
            <FancyQRCode
              :url="metaData.link"
              class="w-28 h-28 transform scale-120"
              :class="horizontal ? 'hidden' : 'block'"
            />
          </ClientOnly>
        </div>
      </div>
      <div
        class="relative min-w-1/3 max-h-full"
        :class="[
          horizontal
            ? 'h-32 basis-[13.5rem]'
            : 'h-45 lg:h-67.5 2xl:h-48 basis-[16rem] flex-grow'
        ]"
      >
        <img
          v-if="metaData.image"
          class="relative m-0 w-full h-full align-bottom object-cover"
          :src="metaData.image"
        />
        <img
          v-else
          class="relative m-0 w-full h-full align-bottom object-cover"
          :src="`https://picsum.photos/seed/${metaData.title}/640/360`"
        />
      </div>
    </a>
    <div
      v-else
      class="text-center px-20 h-32 flex flex-col justify-center items-center !bg-opacity-30 backdrop-filter backdrop-blur-lg backdrop-saturate-[180%] filter drop-shadow-xl transition-all duration-300 ease-out z-10"
      bg="!opacity-75 white dark:slate-800"
    >
      <svg
        class="animate-spin box-content text-slate-700 dark:text-slate-200"
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        data-view-component="true"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          stroke-opacity="0.25"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        ></circle>
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        ></path>
      </svg>
      <span class="mt-4 text-slate-800 dark:text-slate-200">
        Styling your visual web bookmark...
      </span>
    </div>
  </figure>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, type PropType } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import FancyQRCode from '../FancyQRCode.vue'
import { getBase64Image } from '@/utils'

// const API_PREFIX = 'https://get-metafy.netlify.app/.netlify/functions/api?url='
// const API_PREFIX = 'https://metafy.vercel.app/api?url='

type MetaData = {
  title: string
  description: string
  link: string
  image: string
  logo: string
  author: string
  publisher: string
}

const props = defineProps({
  meta: { type: Object as PropType<MetaData>, default: () => {} },
  /**
   * find the special alias and render it
   */
  url: { type: String, require: true, default: '' },
  /**
   * control the bookmark size
   */
  size: { type: String, default: 'medium' },
  /**
   * control the bookmark corner
   */
  corner: { type: String, default: 'xl' },
  /**
   * the image render position of bookmark
   */
  cover: { type: String, default: 'right' },
  /**
   * whether bookmark card is show qrcode
   */
  qrcode: { type: Boolean, default: true },
  /**
   * whether bookmark card is reload
   */
  reload: { type: Boolean, default: false }
})

const isLargeScreen = useMediaQuery('(min-width: 1024px)')

const isLoading = ref(false)
const horizontal = computed(() => isLargeScreen.value)

const metaData = reactive<MetaData>({
  title: '',
  description: '',
  link: '',
  image: '',
  logo: '',
  author: '',
  publisher: ''
})

const loadMeta = async () => {
  isLoading.value = true

  const { data } = await useFetch('/api/metafy', {
    query: {
      url: props.url
    }
  })

  if (data.value && !data.value.error) {
    const metaInfo = data.value.data
    metaData.title = metaInfo.title
    metaData.description = metaInfo.description
    metaData.link = props.url
    metaData.image = metaInfo.image
    metaData.logo = metaInfo.logo
    metaData.author = metaInfo.author
    metaData.publisher = metaInfo.publisher
  }

  isLoading.value = false
}

const bookmarkClass = computed(() => {
  return [
    {
      'web-bookmark-card--large': props.size === 'large',
      'web-bookmark-card--medium': props.size === 'medium',
      'web-bookmark-card--small': props.size === 'small'
    },
    `rounded-${props.corner}`
  ]
})

onMounted(async () => {
  await loadMeta()
})
</script>

<style>
.has-qrcode {
  width: calc(100% - 6rem);
}
</style>
