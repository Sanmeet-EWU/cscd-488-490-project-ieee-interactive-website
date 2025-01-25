import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LHSNav from './Components/LHSNav';
import Home from './Pages/Home/Home';
import Officers from './Pages/Officers/Officers';
import FormerOfficers from './Pages/FormerOfficers/FormerOfficers';
import Employment from './Pages/Employment/Employment';
import ContactForm from './Pages/ContactForm/ContactForm';
import Admin from './Pages/Admin/Admin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Events from './Pages/Events/Events';
import { AuthProvider, useAuth } from './context/AuthContext';
import Footer from './Components/Footer';
import Logo from "./Components/logo";
import TopNavBar from "./Components/TopNavBar";
import './styles/theme.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
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
              <Route path="/employment" element={<Employment />} />
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
