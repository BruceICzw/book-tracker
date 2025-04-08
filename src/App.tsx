import { ConvexProviderWithClerk } from "convex/react-clerk";
import "./App.css";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import DashboardPage from "./pages/Dashboard";
import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

function App() {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sign-in/*"
            element={
              <>
                <Authenticated>
                  <Navigate to="/dashboard" />
                </Authenticated>
                <Unauthenticated>
                  <SignInPage />
                </Unauthenticated>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Authenticated>
                  <DashboardPage />
                </Authenticated>
                <Unauthenticated>
                  <RedirectToSignIn />
                </Unauthenticated>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConvexProviderWithClerk>
  );
}

export default App;
