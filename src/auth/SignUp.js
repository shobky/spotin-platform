import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Authentication/signup.css"
import { useNavigate, Link } from "react-router-dom"
import { TbArrowNarrowLeft } from "react-icons/tb";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

import Loading from '../assets/imgs/loading-gifs-tenor.gif'

export default function Signup() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState({
        password: "password",
        confirm: "password",
    })

    const navigate = useNavigate();


    const showingConfirmthePassword = () => {
        if (showPassword.confirm === "password") {
            setShowPassword({ confirm: "text", password: showPassword.password })
        } else {
            setShowPassword({ confirm: "password", password: showPassword.password })

        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
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

    const showingthePassword = (e) => {
        e.preventDefault()
        if (showPassword.password === "password") {
            setShowPassword({ password: "text", confirm: showPassword.confirm })
        } else {
            setShowPassword({ password: "password", confirm: showPassword.confirm })

        }
    }
    return (
        <div className="auth-container">
            <Link to="/"> <TbArrowNarrowLeft className="auth_back-arr" /> </Link>
            <div className="auth_content">
                <h1 className="auth_header">Sign Up </h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {error &&
                        <p className="auth_err">{error}</p>
                    }
                </div>
                <form onSubmit={handleSubmit} className="auth_form">
                    <div className="nameandemaildiv" >
                        <div><label className="auth_label">Name </label>
                            <input className="sign-up_auth_input auth_input auth_name-input" ref={nameRef} required name="name" type="text" /></div>

                        <div><label className="auth_label">Email </label>
                            <input className="sign-up_auth_input auth_input" ref={emailRef} required name="email" type="email" /></div>
                    </div>
                    <label className="auth_label"> Password </label>
                    <div style={{ position: "relative" }}>
                        <input className="sign-up_auth_input auth_input" ref={passwordRef} required name="new-password" type={showPassword.password} />
                        <button type="button" className="auth_show-password-btn" onClick={(e) => showingthePassword(e)}>{showPassword.password === 'password' ? <RiEyeCloseLine className="passIco" /> : <RiEyeLine className="passIco" />}</button>
                    </div>
                    <label className="auth_label"> Confirm Password </label>
                    <div style={{ position: "relative" }}>
                        <input className="sign-up_auth_input auth_input" ref={passwordConfirmRef} name="password_onfirm" type={showPassword.confirm} />
                        <button type="button" className="auth_show-password-btn" onClick={showingConfirmthePassword}>{showPassword.confirm === 'password' ? <RiEyeCloseLine className="passIco" /> : <RiEyeLine className="passIco" />}</button>
                    </div>
                    <div className="auth_btn-container">
                        <button disabled={loading} className="auth_submit-btn" type="submit">{loading ? (<img width="30" alt="loading" src={Loading} />) : "Create account"}</button>

                    </div>
                </form>
                <p className="auth_footer">Already have an account? <span ><Link className="auth_footer-btn" to="/login">Log In</Link></span></p>
            </div>
            <div className="imginlogin"></div>

        </div>
    )
}
