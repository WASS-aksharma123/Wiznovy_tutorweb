import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../assets/Styles/Search/Result.scss'
import '../../../assets/Styles/Search/SearchSuggestions.scss'
import { Star, Heart, Award } from "lucide-react";
import SearchSuggestions from './SearchSuggestions'

const freelancers = [
    {
        id: 1,
        name: "Start your next project here",
        topRated: true,
        rating: "4.9/5",
        jobs: 40,
        rate: "$75/hr",
        specs: ["Specialization", "Specialization", "Specialization"],
        image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        id: 2,
        name: "Start your next project here",
        topRated: false,
        rating: "4.9/5",
        jobs: 40,
        rate: "$75/hr",
        specs: ["Specialization", "Specialization", "Specialization"],
        image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        id: 3,
        name: "Start your next project here",
        topRated: true,
        rating: "4.9/5",
        jobs: 40,
        rate: "$75/hr",
        specs: ["Specialization", "Specialization", "Specialization"],
        image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        id: 4,
        name: "Start your next project here",
        topRated: false,
        rating: "4.9/5",
        jobs: 40,
        rate: "$75/hr",
        specs: ["Specialization", "Specialization", "Specialization"],
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
];



const Result = () => {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleViewProfile = (freelancerId) => {
        navigate('/details');
    };

    const handleSearch = () => {
        console.log('Searching for:', searchKeyword)
        setShowSuggestions(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value)
        setShowSuggestions(true)
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchKeyword(suggestion)
        setShowSuggestions(false)
        console.log('Selected suggestion:', suggestion)
    }

    return (
        <div>
            <div className="search-bar" style={{ position: 'relative' }}>
                <input 
                    type="text" 
                    placeholder="Search by keyword here..." 
                    value={searchKeyword}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <SearchSuggestions 
                    searchKeyword={searchKeyword}
                    onSuggestionClick={handleSuggestionClick}
                    isVisible={showSuggestions}
                />
                <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <div className="freelancer-list">
                {freelancers.map((f) => (
                    <div key={f.id} className="freelancer-card">
                        <img src={f.image} alt="Freelancer" className="freelancer-img" />
                        <div className="freelancer-details">
                            <div className="freelancer-header">
                                <h3>{f.name}</h3>
                                {f.topRated && <span className="badge">Top Rated</span>}
                                <Heart className="heart-icon" size={20} />
                            </div>

                            <div className="freelancer-info">
                                <div className="rating">
                                    <Star size={16} fill="#f5c518" stroke="none" />
                                    <span>{f.rating} ({f.jobs} jobs)</span>
                                </div>
                                <div className="rate">{f.rate}</div>
                            </div>

                            <div className="specializations">
                                {f.specs.map((s, i) => (
                                    <div className="spec" key={`${f.id}-${s}-${i}`}>
                                        <Award size={14} /> {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="view-profile" onClick={() => handleViewProfile(f.id)}>View profile</button>
                    </div>
                ))}

                <div className="pagination">
                    <button disabled>Prev</button>
                    <button className="active">1</button>
                    <button>2</button>
                    <button >3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>8</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Result
