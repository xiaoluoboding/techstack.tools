const useScrollToMain = () => {
  const scrollToMain = () => {

    const nodes = document.getElementsByTagName('main');
    if (nodes && nodes[0]) {
        const main = nodes[0];
        main.scrollIntoView({ behavior: 'smooth'});
    }
  }

  return {
    scrollToMain
  }
}

export { useScrollToMain }
