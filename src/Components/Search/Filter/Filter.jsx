import React, { useState } from 'react'
import '../../../assets/Styles/Search/Filter.scss'

const Filter = () => {
  const count = 29
  const [priceRange, setPriceRange] = useState({ min: 399, max: 3199, current: 399 })
  const expertiseLevels = ["Beginner / New", "Intermediate", "Experts", "Pro Master"]
  const ratings = ["4.5 + Rating", "4 & Above Rating", "3 & Above Rating", "2 & Above Rating", "1 & Above Rating"]
  const skills = ["English", "Hindi", "Spanish", "French", "German"]
  const countries = ["USA", "Canada", "India", "Australia", "UK"]

  return (
    <div className='filter'>
      <div className="headline">
        <h2>Apply Filter Now</h2>
        <p>({count})</p>
      </div>

      <div className="price-range">
        <h3>Price Range</h3>
        <div className="range-box">
          <input 
            type="range" 
            min={priceRange.min} 
            max={priceRange.max} 
            value={priceRange.current}
            onChange={(e) => setPriceRange({...priceRange, current: Number.parseInt(e.target.value)})}
          />
          <div className="range-values">
            <span>₹{priceRange.min}</span>
            <span>₹{priceRange.current}</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Expertise Level</h3>
        {expertiseLevels.map((level) => (
          <label key={level}>
            <input type="checkbox" />
            {level}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Rating & Review</h3>
        {ratings.map((rating) => (
          <label key={rating}>
            <input type="checkbox" />
            {rating}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Skills</h3>
        {skills.map((skill) => (
          <label key={skill}>
            <input type="checkbox" />
            {skill}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Country</h3>
        {countries.map((country) => (
          <label key={country}>
            <input type="checkbox" />
            {country}
          </label>
        ))}
      </div>

      <div className="buttons">
        <button className='reset'>Reset Now</button>
        <button className='apply'>Apply Filters</button>
      </div>
    </div>
  )
}

export default Filter
