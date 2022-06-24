import { UnocssNuxtOptions } from '@unocss/nuxt'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts
} from 'unocss'

export default defineConfig<UnocssNuxtOptions>({
  include: [/\.vue$/, /\.ts$/, /\.vue\?vue/],
  exclude: [/\.nuxt/, /node_modules/],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
    presetWebFonts({
      fonts: {
        sans: 'Questrial',
        serif: 'DM Serif Display',
        mono: 'DM Mono'
      }
    })
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'text-brand': 'text-violet-500 dark:text-violet-300',
    'bg-brand': 'bg-violet-500',
    'text-primary': 'text-slate-700 dark:text-slate-100',
    'bg-glass': 'bg-opacity-80 backdrop-filter backdrop-blur-[12px]',
    'card-bg': 'bg-white dark:bg-slate-800',
    'card-bd': 'border border-gray-200 dark:border-slate-600'
  }
})
