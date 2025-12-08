
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import './App.css';

// Public Layout
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CaseStudiesPage from './pages/CaseStudiesPage';

// Admin Pages
import AdminLayout from './components/layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Contacts from './pages/admin/Contacts';
import Testimonials from './pages/admin/Testimonials';
import Portfolio from './pages/admin/Portfolio';
import CaseStudies from './pages/admin/CaseStudies';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="messages" element={<Contacts />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="case-studies" element={<CaseStudies />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
