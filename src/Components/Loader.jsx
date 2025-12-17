import React, { memo } from 'react'
import PropTypes from 'prop-types'
import '../assets/Styles/Loader.scss'

const Loader = memo(({ size = 'medium', text = 'Loading...', fullScreen = false, className = '' }) => {
  const sizeClass = {
    small: 'loader-small',
    medium: 'loader-medium',
    large: 'loader-large'
  }[size]

  if (fullScreen) {
    return (
      <div className={`loader-overlay ${className}`}>
        <output className="loader-container" aria-live="polite">
          <div className={`spinner ${sizeClass}`} aria-hidden="true"></div>
          <p className="loader-text" aria-label={text}>{text}</p>
        </output>
      </div>
    )
  }

  return (
    <output className={`loader-inline ${className}`} aria-live="polite">
      <div className={`spinner ${sizeClass}`} aria-hidden="true"></div>
      <p className="loader-text" aria-label={text}>{text}</p>
    </output>
  )
})

Loader.displayName = 'Loader'

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  className: PropTypes.string
}

export default Loader