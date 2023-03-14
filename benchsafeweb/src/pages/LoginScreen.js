import React, { useState } from "react";
import Link from 'next/link';

export const LoginScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return(
    <div>
      <div className="auth-form-container">
        <div>
          {/* header */}
          <div>
            <div>
              <h2>Hey there,</h2>
            </div>
            <div>
              <h1 class="mb-10">Welcome Back</h1>
            </div>
          </div>
          
          {/* login information */}
          <form 
          className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
              value = {email} onChange={(e) => setEmail(e.target.value)} 
              type = "email" 
              placeholder="e.g. anytimefitness@gmail.com" 
              id="enail" 
              name="email"/>
            <label htmlFor="password">Password</label>
            <input 
              value = {password} onChange={(e) => setPassword(e.target.value)} 
              type = "password" 
              placeholder="********" 
              id="password" 
              name="password"/>
          </form>
        </div>

        {/* login button */}
        <div>
          <Link href="/LoadingScreen">
            <button className="button">Login</button>
          </Link>
          <div>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
          </div>
        </div>

      </div>
    </div>
  )
}
