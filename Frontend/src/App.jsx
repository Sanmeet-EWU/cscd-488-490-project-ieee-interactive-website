import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LHSNav from "./Components/LHSNav";
import Home from "./Pages/Home/Home";
import Officers from "./Pages/Officers/Officers";
import FormerOfficers from "./Pages/FormerOfficers/FormerOfficers";
import PhotoGallery from "./Pages/PhotoGallery/PhotoGallery";
import ContactForm from "./Pages/ContactForm/ContactForm";
import Admin from "./Pages/Admin/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Events from "./Pages/Events/Events";
import SocietyChapters from "./Pages/SocietyChapters/SocietyChapters";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Footer from "./Components/Footer";
import Logo from "./Components/logo";
import TopNavBar from "./Components/TopNavBar";
import "./styles/theme.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Logo />
          <TopNavBar />
          <LHSNav />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/officers" element={<Officers />} />
              <Route path="/former-officers" element={<FormerOfficers />} />
              <Route path="/photo-gallery" element={ <PhotoGallery />} />
              <Route path="/society-chapters" element={<SocietyChapters />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/Login" element={<Admin />} />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
