import React, { Suspense, lazy, useState, useEffect } from 'react'
import '../assets/Styles/Pages/Search.scss'
import Loader from '../Components/Loader'

// Lazy load search components
const Filter = lazy(() => import('../Components/Search/Filter/Filter'))
const Result = lazy(() => import('../Components/Search/Result/Result'))

const Search = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate search data loading
        const timer = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <Loader fullScreen text="Loading search..." />
    }

    return (
        <div className="searchPage">
            <div className="container">
                <div className="TitleText">
                    <h2>Start your next project here</h2>
                    <p>Reference site about Lorem Ipsum, giving information</p>
                </div>
                <div className="mainscreen">
                    <div className="filterSection">
                        <Suspense fallback={<Loader size="small" text="Loading filters..." />}>
                            <Filter />
                        </Suspense>
                    </div>
                    <div className="ResultSection">
                        <Suspense fallback={<Loader text="Loading results..." />}>
                            <Result />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Search)