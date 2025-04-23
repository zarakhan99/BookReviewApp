import { useAppContext } from '../context/AppContext'; // Updated import
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;