import React, { memo } from 'react'
import '../assets/Styles/Loader.scss'

const Loader = memo(({ size = 'medium', text = 'Loading...', fullScreen = false, className = '' }) => {
  const sizeClass = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large'
  }[size]

  if (fullScreen) {
    return (
      <div className={`loader-overlay ${className}`} role="status" aria-live="polite">
        <div className="loader-container">
          <div className={`spinner ${sizeClass}`} aria-hidden="true"></div>
          <p className="loader-text" aria-label={text}>{text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`loader-inline ${className}`} role="status" aria-live="polite">
      <div className={`spinner ${sizeClass}`} aria-hidden="true"></div>
      <p className="loader-text" aria-label={text}>{text}</p>
    </div>
  )
})

Loader.displayName = 'Loader'

export default Loader