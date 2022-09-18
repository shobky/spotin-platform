import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Admin = () => {
    let { currentUser } = useAuth()
    const AdminID = "9S1uStIw70RBSfJ8Dl5sdCDh9ND2"


    return (
        currentUser.uid === AdminID ? <Outlet /> : <Navigate to="/login" />
    )
}

export default Admin