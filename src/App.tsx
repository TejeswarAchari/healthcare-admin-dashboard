import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Placeholder Dashboard (We will build the real one in Phase 4)
const Dashboard = () => (
  <div className="p-10">
    <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
    <p>This is a protected route.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;