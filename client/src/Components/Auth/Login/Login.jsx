import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import { FaFacebook,FaGoogle,FaLinkedin } from "react-icons/fa";
 const Login = () => {
  return (
    <>
    <div className="login-body">
    <div class="container" id="container">
        <div class="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <div class="social-container">
                    <Link to="#" class="social"><FaFacebook className='icon-form'/></Link>
                    <Link to="#" class="social"><FaGoogle className='icon-form'/></Link>
                    <Link to="#" class="social"><FaLinkedin className='icon-form'/></Link>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <Link to="#">Forgot your password?</Link>
                <button>Sign In</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button class="ghost" id="signUp"><Link to='/register' id="custom-link-change">Sign Up</Link></button>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
export default Login
