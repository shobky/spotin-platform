import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Authentication/signup.css"
import Loading from '../assets/imgs/loading-gifs-tenor.gif'
import { useNavigate, Link } from "react-router-dom"
import { TbArrowNarrowLeft } from "react-icons/tb";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()


        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                // Signed in 
                navigate('/')

                // ...
            })
            .catch((error) => {
                setError(error.code.slice(5));
                // ..
            });

        setLoading(false)
    }

    const showingthePassword = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div className="auth-container">
            <Link to="/"> <TbArrowNarrowLeft className="auth_back-arr" /> </Link>
            <div className="auth_content">
                <h1 className="auth_header">Log In </h1>
                {error &&
                    <p className="auth_err">{error}</p>
                }
                <form onSubmit={handleSubmit} className="auth_form">
                    <label className="auth_label">Email </label>
                    <input className="Log-in_auth_input auth_input" ref={emailRef} required name="email" type="email" />

                    <label className="auth_label"> Password </label>
                    <div style={{ position: "relative" }}>

                        <input id="password_input" className="Log-in_auth_input auth_input" ref={passwordRef} required name="password" type={showPassword ? "text" : "password"} />
                        <button type="button" className="auth_show-password-btn" onClick={showingthePassword}>{showPassword ? <RiEyeLine className="passIco" /> : <RiEyeCloseLine className="passIco"/>}</button>
                    </div>
                    <div className="auth_btn-container">
                        <button disabled={loading} className="auth_submit-btn" type="submit">{loading ? (<img width="30" alt="loading" src={Loading} />) : "Cuntinue"}</button>
                    </div>
                </form>
                <div style={{ display: "flex", marginTop: "10px", justifyContent: "center" }}>
                    <Link className="auth_forgot-pass" to='/forgor-password'>Forgot Password</Link>
                </div>
                <p className="auth_footer">Don't have an account? <span ><Link className="auth_footer-btn" to="/signup">Sign Up</Link></span></p>
            </div>
            <div className="imginlogin"></div>
        </div>
    )
}