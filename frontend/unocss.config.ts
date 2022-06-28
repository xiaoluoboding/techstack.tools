import { UnocssNuxtOptions } from '@unocss/nuxt'
import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWebFonts,
  presetTypography
} from 'unocss'

export default defineConfig<UnocssNuxtOptions>({
  include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
  exclude: [/\.nuxt/, /node_modules/],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Share Tech',
        serif: 'Share',
        mono: 'Share Tech Mono'
      }
    }),
    presetTypography({})
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'text-brand': 'text-violet-500 dark:text-violet-300',
    'text-neon':
      'text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-violet-300',
    'bg-brand': 'bg-violet-500',
    'text-primary': 'text-slate-700 dark:text-slate-100',
    'bg-glass': 'bg-opacity-80 backdrop-filter backdrop-blur-[12px]',
    'card-bg': 'bg-white dark:bg-slate-800',
    'card-bd': 'border border-gray-200 dark:border-slate-600',
    btn: 'inline-flex text-white bg-violet-500 border-0 py-2 px-6 focus:outline-none hover:bg-violet-600 rounded-lg cursor-pointer',
    'btn-secondary':
      'inline-flex text-violet-500 dark:text-white border-violet-500 border-1 py-2 px-6 focus:outline-none hover:text-white hover:bg-violet-600 rounded-lg cursor-pointer',
    'btn-lg': 'btn py-4 px-8 gap-3',
    'btn-secondary-lg': 'btn-secondary py-4 px-8 gap-3'
  }
})
