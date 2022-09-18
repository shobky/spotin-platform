import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Admin = () => {
    let { currentUser } = useAuth()
    const AdminID = ["9S1uStIw70RBSfJ8Dl5sdCDh9ND2", "oWNIVWS91uUbp0QEwyaD0Deeup82", "8Q5dBucMCnh4oKOlNx6nBYq5gUO2"]


    return (
        AdminID.map((Admin) => currentUser.uid === Admin
            ? <Outlet /> : <Navigate to="/login" />)
    )
}

export default Admin