import { Suspense, lazy, memo } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Provider,useSelector  } from 'react-redux'
import store from './store/store.js'
import './App.scss'
import Footer from './Components/Footer'
import Header from './Components/Header'
import ScrollToTop from './Components/ScrollToTop'
import ProtectedRoute from './Components/ProtectedRoute'
import Loader from './Components/Loader'
import ErrorBoundary from './Components/ErrorBoundary'
import PendingStatusPage from './Components/PendingStatusPage'
import SignIn from './Components/AuthPages/SignIn.jsx'
import SignUp from './Components/AuthPages/SignUp.jsx'
import AuthRedirect from './Components/AuthPages/AuthRedirect.jsx'
import RouteLoader from './Components/RouteLoader'

import Course from './pages/Course.jsx'

// Lazy load components with error handling and preloading
const Home = lazy(() =>
  import('./pages/Home').catch(() => ({ default: () => <div>Error loading Home</div> }))
)
const About = lazy(() =>
  import('./pages/About').catch(() => ({ default: () => <div>Error loading About</div> }))
)
const Services = lazy(() =>
  import('./pages/Services').catch(() => ({ default: () => <div>Error loading Services</div> }))
)
const Contact = lazy(() =>
  import('./pages/Contact').catch(() => ({ default: () => <div>Error loading Contact</div> }))
)
const OnBoardMain = lazy(() =>
  import('./Components/OnBoardForms/OnBoardMain').catch(() => ({ default: () => <div>Error loading Onboarding</div> }))
)
const TermsAndCondition = lazy(() =>
  import('./pages/TermsAndCondition').catch(() => ({ default: () => <div>Error loading Terms</div> }))
)
const DashBoard = lazy(() =>
  import('./pages/DashBoard').catch(() => ({ default: () => <div>Error loading Dashboard</div> }))
)
const Search = lazy(() =>
  import('./pages/Search.jsx').catch(() => ({ default: () => <div>Error loading Search</div> }))
)
const Details = lazy(() =>
  import('./Components/Search/Result/Details.jsx').catch(() => ({ default: () => <div>Error loading Details</div> }))
)
const Wallet = lazy(() =>
  import('./Components/Wallet/Wallet.jsx').catch(() => ({ default: () => <div>Error loading Wallet</div> }))
)
const Schedule = lazy(() =>
  import('./Components/Schedule.jsx').catch(() => ({ default: () => <div>Error loading Schedule</div> }))
)
const AllCourses = lazy(() =>
  import('./Components/AllCourses.jsx').catch(() => ({ default: () => <div>Error loading All Courses</div> }))
)
const MyBooks = lazy(() =>
  import('./Components/Book/MyBooks.jsx').catch(() => ({ default: () => <div>Error loading My Books</div> }))
)
const BookDetails = lazy(() =>
  import('./Components/Book/BookDetails.jsx').catch(() => ({ default: () => <div>Error loading Book Details</div> }))
)

const AuthGuard = memo(() => {
  const token = localStorage.getItem('token')
  const { user } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)

  if (!token) return <SignIn />

  const isPending = user?.status === 'PENDING' || profile?.status === 'PENDING'
  return isPending ? <PendingStatusPage /> : <Navigate to="/dashboard" replace />
})

AuthGuard.displayName = 'AuthGuard'


function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RouteLoader />
        <ScrollToTop />
        <Header />
        <main style={{ minHeight: '100vh', paddingTop: '80px' }} className="main-content">
          <Suspense fallback={<Loader fullScreen text="Loading page..." />}>
            <Routes>
              <Route path='/' element={<AuthGuard />} />
              <Route path='/signup' element={<AuthRedirect><SignUp /></AuthRedirect>} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path='/onboarding' element={<ProtectedRoute><OnBoardMain /></ProtectedRoute>} />
              <Route path='/terms' element={<TermsAndCondition />} />
              <Route path='/dashboard' element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
              <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path='/details/:id?' element={<ProtectedRoute><Details /></ProtectedRoute>} />
              <Route path='/wallet' element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
              <Route path='/schedule' element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
              <Route path='/all-courses' element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
              <Route path='/course' element={<Course />} />
              <Route path='/my-books' element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
              <Route path='/book-details/:bookId' element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
              <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
