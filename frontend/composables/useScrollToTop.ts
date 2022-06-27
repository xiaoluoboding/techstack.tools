const useScrollToTop = () => {
  const scrollTop = ref()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    scrollTop.value = 0
  }

  return {
    scrollToTop
  }
}

export { useScrollToTop }
