import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoutes = () => {
    let { currentUser } = useAuth()
    
    return (
        currentUser ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes