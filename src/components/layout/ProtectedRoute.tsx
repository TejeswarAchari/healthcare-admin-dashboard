import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;