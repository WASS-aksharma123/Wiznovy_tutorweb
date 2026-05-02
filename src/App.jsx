import { Suspense, lazy, memo, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store/store.js'
import { fetchCurrentStep } from './store/onboardingSlice.js'
import './App.scss'
import Footer from './Components/Footer'
import Header from './Components/Header'
import MySessions from './pages/MySessions.jsx'
import ScrollToTop from './Components/ScrollToTop'
import ProtectedRoute from './Components/ProtectedRoute'
import Loader from './Components/Loader'
import ErrorBoundary from './Components/ErrorBoundary'
import PendingStatusPage from './Components/PendingStatusPage'
import SignIn from './Components/AuthPages/SignIn.jsx'
import SignUp from './Components/AuthPages/SignUp.jsx'
import AuthRedirect from './Components/AuthPages/AuthRedirect.jsx'
import RouteLoader from './Components/RouteLoader'
import GeneralPageBackEnd from './pages/GeneralPageBackEnd.jsx'
import Course from './pages/Course.jsx'
import SupportAndHelp from './pages/SupportAndHelp.jsx'
import HowToHire from './Components/FooterPages/HowToHire.jsx'
import Transactions from './Components/Wallet/Transactions.jsx'
import TalentMarketplace from './Components/FooterPages/TalentMarketplace.jsx'
import ProjectCatalog from './Components/FooterPages/ProjectCatalog.jsx'
import Hireanagency from './Components/FooterPages/Hireanagency.jsx'
import Workwithads from './Components/FooterPages/Workwithads.jsx'
import WorldwideFind from './Components/FooterPages/WorldwideFind.jsx'
import FindFreelanceJobs from './Components/FooterPages/FindFreelanceJobs.jsx'
import Leadership from './Components/FooterPages/Leadership.jsx'
import SucessStories from './Components/FooterPages/SuccessStories.jsx'
import BlogAffiliateProgramme from './Components/FooterPages/BlogAffiliateProgramme.jsx'
import OurImpact from './Components/FooterPages/OurImpact.jsx'
import Careers from './Components/FooterPages/Careers.jsx'
import FreeBusiness from './Components/FooterPages/FreeBusiness.jsx'
import HowToFindWork from './Components/FooterPages/HowToFindWork.jsx'
import FloatingChat from './Components/Chatbot/FloatingChat.jsx'
import ConnectivityStatus from './Components/ConnectivityStatus.jsx'
import GlobalModals from './Components/GlobalModals.jsx'
import { setupGlobalErrorHandling } from './utils/networkErrorHandler.js'

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
  import('./Components/Wallet/Wallet.jsx').catch((error) => {
    console.error("Error loading Wallet:", error);
    return { default: () => <div>Error loading Wallet: {error.message}</div> };
  })
)
const AllCourses = lazy(() =>
  import('./Components/Course/AllCourses.jsx').catch(() => ({ default: () => <div>Error loading All Courses</div> }))
)
const MyBooks = lazy(() =>
  import('./Components/Book/MyBooks.jsx').catch(() => ({ default: () => <div>Error loading My Books</div> }))
)
const BookDetails = lazy(() =>
  import('./Components/Book/BookDetails.jsx').catch(() => ({ default: () => <div>Error loading Book Details</div> }))
)


const AuthGuard = memo(() => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)
  const { currentStep, stepFetched } = useSelector((state) => state.onboarding)
  const [isCheckingStep, setIsCheckingStep] = useState(false)

  useEffect(() => {
    let isMounted = true;
    
    const checkUserStep = async () => {
      // Only check step if we have token, user, and haven't fetched step yet
      if (token && isAuthenticated && user && !stepFetched && !isCheckingStep) {
        setIsCheckingStep(true);
        try {
          await dispatch(fetchCurrentStep()).unwrap()
        } catch (error) {
          console.warn('Could not fetch current step:', error)
        } finally {
          if (isMounted) {
            setIsCheckingStep(false)
          }
        }
      }
    }

    checkUserStep()
    
    return () => {
      isMounted = false;
    };
  }, [token, isAuthenticated, user, stepFetched, isCheckingStep, dispatch])

  if (isCheckingStep) {
    return <Loader fullScreen text="Initializing..." />
  }

  if (!token) return <SignIn />

  const isPending = user?.status === 'PENDING' || profile?.status === 'PENDING'
  if (isPending) return <PendingStatusPage />

  // Only redirect after we've fetched the step or if we already have it
  if (stepFetched || currentStep !== 1) {
    if (currentStep === 12) {
      return <Navigate to="/dashboard" replace />
    } else {
      return <Navigate to="/onboarding" replace />
    }
  }

  // Default fallback while checking
  return <Loader fullScreen text="Loading..." />
})

AuthGuard.displayName = 'AuthGuard'


function App() {
  // Setup global error handling on app initialization
  useEffect(() => {
    setupGlobalErrorHandling();
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RouteLoader />
        <ScrollToTop />
        <ConnectivityStatus />
        <Header />
        <FloatingChat/>
        <GlobalModals />
        <main style={{ minHeight: 'calc(100vh - 160px)', paddingTop: '80px', paddingBottom: '20px' }} className="main-content">
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
              <Route path='/all-courses' element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
              <Route path='/course' element={<Course />} />
              <Route path='/my-books' element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
              <Route path='/my-sessions' element={<ProtectedRoute><MySessions /></ProtectedRoute>} />
              <Route path='/transactions' element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
              <Route path='/book-details/:bookId' element={<ProtectedRoute><BookDetails /></ProtectedRoute>} />
              <Route path='*' element={<Navigate to="/" replace />} />
              <Route path='/support' element={<SupportAndHelp />} />
              <Route path='/how-to-hire' element={<HowToHire />} />
              <Route path='/general-backend' element={<GeneralPageBackEnd />} />
              <Route path='/talentmarketplace' element={<TalentMarketplace />} />
              <Route path='/project-catalog' element={<ProjectCatalog />} />
              <Route path='/hire-agency' element={<Hireanagency />} />
              <Route path='/work-with-ads' element={<Workwithads />} />
              <Route path='/worldwide-find' element={<WorldwideFind />} />
              <Route path='/find-freelance-jobs' element={<FindFreelanceJobs />} />
              <Route path='/leadership' element={<Leadership />} />
              <Route path='/success-stories' element={<SucessStories />} />
              <Route path='/blog-affiliate-programme' element={<BlogAffiliateProgramme />} />
              <Route path='/our-impact' element={<OurImpact />} />
              <Route path='/careers' element={<Careers />} />
              <Route path='/free-business' element={<FreeBusiness />} />
              <Route path='/how-to-find-work' element={<HowToFindWork />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
