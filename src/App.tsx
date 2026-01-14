import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardView from '@/features/dashboard/DashboardView';
import NotFound from '@/pages/NotFound';
import Patients from '@/pages/Patients';
import Settings from '@/pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Area: Requires Authentication */}
        <Route element={<ProtectedRoute />}>
          
          {/* Dashboard Layout: Includes Sidebar & Header */}
          <Route element={<DashboardLayout />}>
            
            {/* The Main Dashboard Page (KPIs + Table) */}
            <Route path="/" element={<DashboardView />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/settings" element={<Settings />} />
            
          </Route>
        </Route>

      {/* 404 Route: Catches EVERYTHING else */}
        <Route path="*" element={<NotFound />} /> {/* <--- The Fix */}
      </Routes>
    </Router>
  );
}

export default App;