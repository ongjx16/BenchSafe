import React, { useState } from "react";
import Link from 'next/link';


// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { TextField } from '@mui/material';
// import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase-config";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext"
// import { ReactNotifications, Store } from 'react-notifications-component'
// import 'react-notifications-component/dist/theme.css'
// import {Link} from "react-router-dom";



function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth()


  // const [user,setUser] = useState({});


  const signin = async () => {
    try {
      const user = await login(
        loginEmail,
        loginPassword
      );
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      Store.addNotification({
        title: "Error",
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 4000,
          onScreen: true
        }
      });
    }
  };


  return (
    <div>
      <Header />
      <ReactNotifications />
      <div className="flex-vertical h-30 align-middle mb-5">
        <h1 className="text-center m-auto text-yellow">
          <span>Welcome To Silver</span>
          <span className="text-black">Fun</span>
        </h1>
        <h3 className="text-center m-auto text-grey">
          Please enter your details
        </h3>
      </div>

      <div className="flex justify-evenly mb-20">
        <div className="max-w-4xl mx-10 ">
          <img src={require('../assets/signup-page-art.png')} alt="Elderly exercising" />
        </div>
        <div className="flex w-1/3">
          <div className="container mx-20 bg-blue-100 w-full rounded-xl shadow p-8 m-10">
            <div className="my-5">
              <h3>E-mail</h3>
              <TextField fullWidth id="email" label="Please Enter Email" variant="outlined"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }} />
            </div>
            <div>
              <h3>Password</h3>
              <TextField fullWidth id="password" label="Please Enter Password" variant="outlined"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }} />
            </div>
            <button class=" mt-10 bg-white h-15 w-full rounded-lg align-middle items-center justify-center text-2xl rounded-md  hover:scale-105 transition-all duration-150 ease-linear drop-shadow-lg" onClick={signin}>Log in</button>
            <div className="mt-4">
              <p>
                New to SilverFun? <a href="/Signup" className="text-blue-700">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Login;

// export const LoginScreen = (props) => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email);
//   }

//   return(
//     <div>
//       <div className="auth-form-container">
//         <div>
//           {/* header */}
//           <div>
//             <div>
//               <h2>Hey there,</h2>
//             </div>
//             <div>
//               <h1 class="mb-10">Welcome Back</h1>
//             </div>
//           </div>
          
//           {/* login information */}
//           <form 
//           className="login-form" onSubmit={handleSubmit}>
//             <label htmlFor="email">Email</label>
//             <input 
//               value = {email} onChange={(e) => setEmail(e.target.value)} 
//               type = "email" 
//               placeholder="e.g. anytimefitness@gmail.com" 
//               id="enail" 
//               name="email"/>
//             <label htmlFor="password">Password</label>
//             <input 
//               value = {password} onChange={(e) => setPassword(e.target.value)} 
//               type = "password" 
//               placeholder="********" 
//               id="password" 
//               name="password"/>
//           </form>
//         </div>

//         {/* login button */}
//         <div>
//           <Link href="/LandingPage">
//             <button className="button">Login</button>
//           </Link>
//           <div>
//             <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register Here</button>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }
