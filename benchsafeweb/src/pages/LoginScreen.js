import React, { useState } from "react";
import cover from '../../public/assets/benchsafe.jpg'

export const LoginScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }

  return(
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">BenchSafe</h1>
        </div>
        
        <img src={cover} alt="cover" className="w-full h-full object-cover"/>
      </div>
      <div>
        <div className="auth-form-container">
          <div>
          <div>
            <h2>Hey there,</h2>
            <h1 className="mb-10">Welcome Back</h1>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
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

          <div>

            <div>
              <button>Login</button>
            </div>
            <div>
              <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}