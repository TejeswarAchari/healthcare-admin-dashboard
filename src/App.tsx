import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout'; 


const DashboardPlaceholder = () => (
  <div className="text-gray-500">Dashboard content loading...</div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Area */}
        <Route element={<ProtectedRoute />}>
     
          <Route element={<DashboardLayout />}> 
             <Route path="/" element={<DashboardPlaceholder />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;