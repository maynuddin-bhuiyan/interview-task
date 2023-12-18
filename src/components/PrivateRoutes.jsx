// react router import 
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('logInToken');
    console.log(token)  
    return token && typeof token === 'string' ? <Outlet/> : <Navigate to="/login"/> 
    
}

export default PrivateRoutes