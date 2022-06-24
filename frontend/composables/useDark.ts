import { computed } from 'vue'

const useDark = () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.preference === 'dark')
  const toggleDark = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  }

  return {
    isDark,
    toggleDark
  }
}

export { useDark }
