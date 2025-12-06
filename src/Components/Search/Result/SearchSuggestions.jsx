import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../../config/api'

const SearchSuggestions = ({ searchKeyword, onSuggestionClick, isVisible }) => {
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchKeyword.trim().length > 0 && isVisible) {
                fetchSuggestions(searchKeyword)
            } else {
                setSuggestions([])
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchKeyword, isVisible])

    const fetchSuggestions = async (keyword) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${API_BASE_URL}/global-search/suggestions?keyword=${keyword}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            
            if (response.ok) {
                const data = await response.json()
                let suggestionsList = []
                if (Array.isArray(data)) {
                    suggestionsList = data.map(item => 
                        typeof item === 'object' && item.name ? item.name : item
                    )
                }
                setSuggestions(suggestionsList.slice(0, 10))
            } else {
                setSuggestions([])
            }
        } catch (error) {
            console.error('Failed to fetch suggestions:', error)
            setSuggestions([])
        } finally {
            setLoading(false)
        }
    }

    if (!isVisible) {
        return null
    }

    const renderContent = () => {
        if (loading) {
            return (
                <div className="suggestion-item loading">
                    <span>Loading suggestions...</span>
                </div>
            )
        }
        
        if (suggestions.length > 0) {
            return suggestions.map((suggestion, index) => (
                <button 
                    key={`suggestion-${index}-${suggestion}`}
                    className="suggestion-item"
                    onClick={() => onSuggestionClick(suggestion)}
                >
                    <span className="suggestion-text">{suggestion}</span>
                </button>
            ))
        }
        
        if (searchKeyword.trim().length > 0) {
            return (
                <div className="suggestion-item loading">
                    <span>No suggestions found</span>
                </div>
            )
        }
        
        return null
    }

    return (
        <div className="search-suggestions">
            {renderContent()}
        </div>
    )
}

export default SearchSuggestions