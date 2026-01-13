import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardView from '@/features/dashboard/DashboardView';

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
            
          </Route>
        </Route>

        {/* Catch-all: Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;