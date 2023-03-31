import React, { useState } from "react";
import Link from 'next/link';
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../firebase-config";


function LoginScreen() {
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login  = async(email, password) =>{
    console.log(email)
    console.log(password)
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("login successful")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <div className="flex flex-row justify-center">
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
        </div>

        {/* login button */}
        <div>
          {/* <Link href="/LandingPage"> */}
            <button className="button"
            onClick={(event) => { 
              console.log("logging in");
              login(loginEmail, loginPassword); }}
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