import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import { FaFacebook,FaGoogle,FaLinkedin } from "react-icons/fa";
 const Register = () => {
  return (
    <>
    <div className="login-body">
    <div className="container" id="container">
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <div className="social-container">
                    <Link to="#" className="social"><FaFacebook className='icon-form'/></Link>
                    <Link to="#" className="social"><FaGoogle className='icon-form'/></Link>
                    <Link to="#" className="social"><FaLinkedin className='icon-form'/></Link>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>Sign Up</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn"><Link to='/login' className="custom-link-change">Sign In</Link></button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
export default Register
