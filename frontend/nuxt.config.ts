import { defineNuxtConfig } from 'nuxt'
import ViteComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

const title = 'Explore Tech Stack Tools'
const description =
  'Discover our curated list of tech stack tools to supercharge your next project. Created by @xiaoluoboding.'
const url = 'https://tech-stack.tools'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    bodyAttrs: {
      class: 'min-h-screen'
    },
    title:
      'tech-stack.tools: Tech Stack Tools Database for Devloper、Designer、Creator',
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { hid: 'description', name: 'description', content: description },
      // og protocol
      { hid: 'og:site_name', property: 'og:site_name', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: `${url}/preview.png` },
      // Twitter Card
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${url}/preview.png`
      },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        async: true,
        defer: true,
        'data-website-id': 'f1902438-519c-4acd-98d9-2a6f0de4f111',
        src: 'https://analytics.tech-stack.tools/umami.js'
      }
    ]
  },

  modules: [
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // https://github.com/unocss/unocss
    '@unocss/nuxt',
    // https://vueuse.org
    '@vueuse/nuxt',
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode',
    'unplugin-icons/nuxt'
  ],

  runtimeConfig: {
    NOTION_KEY: process.env.NOTION_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID
  },

  unocss: {
    preflight: true,
    attributify: true
  },

  colorMode: {
    classSuffix: ''
  },

  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({
            componentPrefix: ''
          })
        ],
        dts: true
      })
    ],
    // connect the backend
    server: {
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080/',
          changeOrigin: true
        }
      }
    }
  }
})
