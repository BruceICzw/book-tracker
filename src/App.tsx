import { ConvexProviderWithClerk } from 'convex/react-clerk'
import './App.css'
import { ConvexReactClient } from 'convex/react'
import { RedirectToSignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import SignInPage from './pages/SignIn'
import DashboardPage from './pages/Dashboard'

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL,)

function App() {
  
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />

          <Route
            path='/dashboard'
            element={
              <>
                <SignedIn>
                  <DashboardPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          
          />

          
        </Routes>
      </BrowserRouter>
    </ConvexProviderWithClerk>
  )
}

export default App
