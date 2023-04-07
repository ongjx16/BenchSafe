import React, { useState } from "react";
import Link from 'next/link';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../firebase-config";
import Router from "next/router";


function LoginScreen() {
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState (0);
  const [user, setUser] = useState(null);

  const login  = async(email, password) =>{
    console.log(email)
    console.log(password)
    await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      await setLoginSuccess(1);
      console.log("login successful")
      Router.push({
        pathname: '/Directory',
      })
      console.log("router pushed")

      // ...
    })
    .catch((error) => {
      setLoginSuccess(2);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <div className="flex flex-row justify-center pt-5">
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
            className="login-form">
            <label htmlFor="email">Email</label>
            <input
              onChange={(event) => { setLoginEmail(event.target.value); }}
              type="email"
              placeholder="e.g. anytimefitness@gmail.com"
              id="enail"
              name="email" />

            <label htmlFor="password">Password</label>
            <input
              onChange={(event) => { setLoginPassword(event.target.value); }}
              type="password"
              placeholder="********"
              id="password"
              name="password" />

          </form>
          {loginSuccess == 2?
          <text className = "text-red-500">Incorrect password, try again!</text>:<div></div>}
        </div>

        {/* login button */}
        <div>
          {/* <Link href="/LandingPage"> */}
            <button className="button"
            onClick={async (event) => { 
              console.log("logging in");
              await login(loginEmail, loginPassword); 
              console.log("logged in?", loginSuccess)
            
            
            }}
            >Login</button>
          {/* </Link> */}
          <div>
            <Link href="/RegisterScreen">
              <button className="link-btn">Don't have an account? Register Here</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginScreen;