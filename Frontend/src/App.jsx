import React from "react"; // Import the React library
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import routing components from react-router-dom
// Import various components and pages used in the app in general
import LHSNav from "./Components/LHSNav";
import Home from "./Pages/Home/Home";
import Officers from "./Pages/Officers/Officers";
import FormerOfficers from "./Pages/FormerOfficers/FormerOfficers";
import PhotoGallery from "./Pages/PhotoGallery/PhotoGallery";
import ContactForm from "./Pages/ContactForm/ContactForm";
import Admin from "./Pages/Admin/Admin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Events from "./Pages/Events/Events";
//import SocietyChapters from './Pages/SocietyChapters/SocietyChapters';
import { AuthProvider, useAuth } from "./context/AuthContext";
import Footer from "./Components/Footer";
import Logo from "./Components/logo";
import TopNavBar from "./Components/TopNavBar";
import "./styles/theme.css";

// Define a ProtectedRoute component to guard routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from context

  // If user is not authenticated, navigate to the admin page (login)
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }
  // If authenticated, render the protected child component(s)
  return children;
};

const App = () => {
  return (
    // Wrap the app in Router to enable client-side routing
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
              <Route path="/photo-gallery" element={<PhotoGallery />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/admin" element={<Admin />} />
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
