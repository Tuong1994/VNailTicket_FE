const vLazyload = {
  mounted(el: HTMLImageElement, biding: any) {
    const renderImage = () => {
      el.src = el.dataset.src ?? ''
    }

    const intersectionCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          renderImage()
          observer.unobserve(el)
        }
      })
    }

    const createIntersectionObserver = () => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }

      const observer = new IntersectionObserver(intersectionCallback, options)
      observer.observe(el)
    }

    if (biding.value === 'lazy') {
      if (window['IntersectionObserver']) createIntersectionObserver()
      else renderImage()
    } else renderImage()
  }
}

export default vLazyload
