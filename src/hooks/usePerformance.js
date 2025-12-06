import { useEffect, useCallback } from 'react'

export const usePerformance = (componentName) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      console.log(`${componentName} render time: ${endTime - startTime}ms`)
    }
  }, [componentName])
}

export const useDebounce = (callback, delay) => {
  const debouncedCallback = useCallback(
    (...args) => {
      const timeoutId = setTimeout(() => callback(...args), delay)
      return () => clearTimeout(timeoutId)
    },
    [callback, delay]
  )
  
  return debouncedCallback
}

export const useImagePreloader = (imageSources) => {
  useEffect(() => {
    const preloadImages = imageSources.map(src => {
      const img = new Image()
      img.src = src
      return img
    })
    
    return () => {
      preloadImages.forEach(img => {
        img.src = ''
      })
    }
  }, [imageSources])
}