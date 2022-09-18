import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const UserRoute = () => {
    let { currentUser } = useAuth()
    
    return (
        currentUser ? <Outlet /> : <Navigate to="/login" />
    )
}

export default UserRoute