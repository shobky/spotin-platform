import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/login")
  }

  return (
    <div>
      {
        currentUser ?
          <>
            <div>{currentUser.email}</div>
            <button onClick={logoutUser}>logout</button>
            <p>{process.env.REACT_APP_SECRET_NAME}</p>
            <Link to={`your-profile`}>Profile</Link>
            <br />
            <Link to={`/login`}>login</Link>
            <br />

            <Link to={`/signup`}>signup</Link>
            <br />

            <Link to={`/pos`}>pos</Link>
            <br />

            <Link to={`/pos/open-orders`}>orders</Link>


          </>
          : "not a user"
      }

    </div>
  )
}

export default Home