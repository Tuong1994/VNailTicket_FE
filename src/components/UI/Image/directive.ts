const vLazyload = {
  mounted(el: HTMLImageElement) {
    const renderImage = () => {
      el.src = el.dataset.src ?? ''
    }

    const createIntersectionObserver = () => {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              renderImage()
              observer.unobserve(el)
            }
          })
        },
      )
      observer.observe(el)
    }

    if (window['IntersectionObserver']) createIntersectionObserver()
    else renderImage()
  }
}

export default vLazyload
