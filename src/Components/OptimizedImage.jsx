import React, { useState, memo } from 'react'
import Loader from './Loader'

const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/api/placeholder/400/300',
  loading = 'lazy',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`image-placeholder ${className}`} {...props}>
        <span>Image not available</span>
      </div>
    )
  }

  return (
    <div className={`image-container ${className}`} {...props}>
      {isLoading && (
        <div className="image-loader">
          <Loader size="small" text="" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: isLoading ? 'none' : 'block' }}
        className={className}
      />
    </div>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage