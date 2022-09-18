import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Admin = () => {
    let { currentUser } = useAuth()
    const DevId = "9S1uStIw70RBSfJ8Dl5sdCDh9ND2";
    const OwnerId = "oWNIVWS91uUbp0QEwyaD0Deeup82"

    return (
        currentUser.uid === DevId || OwnerId ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Admin