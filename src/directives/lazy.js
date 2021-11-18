//  图片懒加载自定义指令

let imgs = []

const setImage = img => {
  // 先给img清晰度低一点的图， 浏览器视口图片进行更换
  img.dom.src = img.defaultSrc
  const height = document.documentElement.clientHeight
  const rect = img.dom.getBoundingClientRect()
  if (rect.top >= -rect.height && rect.top <= height) {
    img.dom.src = img.src

    imgs = imgs.filter(i => i !== img)
  }
}

const setImages = () => {
  for (const img of imgs) {
    setImage(img)
  }
}

const debounce = (fn, duration) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(args)
    }, duration)
  }
}

window.addEventListener('scroll', debounce(setImages, 300))

export default {
  inserted (el, binding) {
    const defaultSrc = el.getAttribute('data-src')
    const img = {
      dom: el,
      src: binding.value,
      defaultSrc
    }
    imgs.push(img)
    setImage(img)
  }
}
