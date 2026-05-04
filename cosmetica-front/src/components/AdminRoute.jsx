import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, token } = useContext(AuthContext);

     
     if (!user || !token) {
       return <Navigate to="/login" />;
     }
     if(user.role !== 'admin') {
       return <div className="text-center mt-5">Vous devez avoir les droits d'administration pour accéder à cette page.</div>;
     }
     return <Outlet />;
};

export default AdminRoute;