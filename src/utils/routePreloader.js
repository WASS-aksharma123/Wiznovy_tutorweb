// Route preloading utility
const routePreloader = {
  preloadedRoutes: new Set(),
  
  preload: (routeImport) => {
    if (!routePreloader.preloadedRoutes.has(routeImport)) {
      routePreloader.preloadedRoutes.add(routeImport)
      routeImport().catch(err => {
        console.warn('Route preload failed:', err)
        routePreloader.preloadedRoutes.delete(routeImport)
      })
    }
  },

  preloadOnHover: (routeImport) => {
    return {
      onMouseEnter: () => routePreloader.preload(routeImport),
      onFocus: () => routePreloader.preload(routeImport)
    }
  }
}

export default routePreloader