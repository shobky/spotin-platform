import { useAuth } from '../contexts/AuthContext';
const Profile = () => {
    const currentUser = useAuth();
    console.log(currentUser)
    return (
        <div>
            <p> {currentUser.currentUser.uid} </p>
            <p> {currentUser.currentUser.email} </p>
            <p> {currentUser.currentUser.name} </p>

        </div>
    )
}

export default Profile