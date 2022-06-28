import { computed } from 'vue'

const useDark = () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')
  const toggleDark = () =>
    colorMode.value === 'light'
      ? (colorMode.preference = 'dark')
      : (colorMode.preference = 'light')

  return {
    isDark,
    toggleDark
  }
}

export { useDark }
