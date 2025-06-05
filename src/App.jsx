// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import TeamCreationPage from "./pages/TeamCreationPage";
import PositionSelectionPage from "./pages/PositionSelectionPage";
import TeamSettings from "./pages/TeamSettings";
import MatchSchedulePage from "./pages/MatchSchedulePage";
import ToastContainer from "./components/Profile/ToastContainer";
import { setShowToastFunction } from "./components/hooks/useToast";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import MatchListPage from './pages/MatchListPage';
import MatchSettingsPage from './pages/MatchSettingsPage';
import Footer from "./components/Footer/Footer";
import { isLoggedIn } from "./utils/auth";

// AppWrapper component to use useLocation hook
const AppWrapper = () => {
  const location = useLocation();
  const hideHeaderOn = ["/login", "/register"];
  const shouldHideHeader = hideHeaderOn.includes(location.pathname);
  
  // Redirect to login if not logged in (except for login and register pages)
  const requireAuth = (element) => {
    if (!isLoggedIn() && !hideHeaderOn.includes(location.pathname)) {
      return <LoginPage redirectPath={location.pathname} />;
    }
    return element;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideHeader && <Header />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={requireAuth(<ProfilePage />)} />
          <Route path="/team-settings" element={requireAuth(<TeamSettings />)} />
          <Route path="/team-creation" element={requireAuth(<TeamCreationPage />)} />
          <Route path="/position-selection" element={requireAuth(<PositionSelectionPage />)} />
          <Route path="/match-schedulePage" element={requireAuth(<MatchSchedulePage />)} />
          <Route path="/match/:id" element={<TeamDetailsPage />} />
          <Route path="match-list" element={<MatchListPage />} />
           <Route path="/match/:id/settings" element={<MatchSettingsPage />} />
        </Routes>
      </main>
      {!shouldHideHeader && <Footer />}
      <ToastContainer ref={(container) => {
        if (container) {
          setShowToastFunction(container.showToast);
        }
      }} />
    </div>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;