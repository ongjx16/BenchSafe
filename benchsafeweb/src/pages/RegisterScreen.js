import React, { useState } from "react";

import Header from "../components/Header";
import { TextField } from '@mui/material';
import Footer from "../components/Footer";
import { Alert } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Link } from "react-router-dom";


function RegisterScreen() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [cfmPassword, cfmRegisteredPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth()

  const navigate = useNavigate();

  // const [user,setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) =>{
  //   setUser(currentUser);
  // })

  const register = async () => {
    if (registerPassword !== cfmPassword) {
      return setError("Passwords do not match")
    }

    try {
      const user = await signup(
        registerEmail,
        registerPassword
      );
      console.log(user);
      navigate("/Preferences");
    } catch (error) {
      setError(error.message);
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
      {error && <Alert color="red">{error}</Alert> /* FIX THIS */}
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
          <img src={require('../assets/signup-page-art.png')} alt="" />
        </div>
        <div className="flex w-1/3">
          <div className="container mx-20 bg-blue-100 w-full rounded-xl shadow p-8 m-10">
            <div className="my-5">
              <h3>E-mail</h3>
              <TextField fullWidth id="email" label="Please Enter Email" variant="outlined"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }} />
            </div>
            <div>
              <h3>Password</h3>
              <TextField fullWidth id="password" label="Please Enter Password" variant="outlined"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
            </div>
            <div className="my-5">
              <h3>Re-Enter Password</h3>
              <TextField fullWidth id="cfmpassword" label="Please Enter Password Again" variant="outlined"
                onChange={(event) => {
                  cfmRegisteredPassword(event.target.value);
                }}
              />
                <button class=" mt-10 bg-white h-15 w-full rounded-lg align-middle items-center justify-center text-2xl rounded-md  hover:scale-105 transition-all duration-150 ease-linear drop-shadow-lg" onClick={register}>Sign up</button>
              <div className="mt-4">
                <p>
                  Already on SilverFun? <a href="/Login" className="text-blue-700">Log in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default RegisterScreen;

// export const RegisterScreen = (props) => {
    
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [gymname, setGymName] = useState('');
//     const [gymlocation, setGymLocation] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(email);
//     }
    
//     return(
//         <div>
//             <div className="auth-form-container">
//                 <div>
//                     {/* header */}
//                     <div>
//                         <div>
//                             <h2>Hey there,</h2>
//                         </div>
//                         <div>
//                             <h1 class="mb-10">Create a BenchSafe Account</h1>
//                         </div>
//                     </div>
                    
//                     {/* register information */}
//                     <form 
//                     className="register-form" onSubmit={handleSubmit}>
//                         <label htmlFor="gymname">Gym Name</label>
//                         <input 
//                             value={gymname} onChange={(e) => setGymName(e.target.value)} 
//                             type="gymname" 
//                             id="gymname" 
//                             placeholder="e.g. Anytime Fitness"/>
//                         <label htmlFor="gymlocation">Gym Location</label>
//                         <input 
//                             value={gymlocation} onChange={(e) => setGymLocation(e.target.value)} 
//                             type="gymlocation" 
//                             id="gymlocation" 
//                             placeholder="e.g. Tampines"/>
//                         <label htmlFor="email">Email</label>
//                         <input 
//                             value = {email} onChange={(e) => setEmail(e.target.value)} 
//                             type = "email" 
//                             placeholder="e.g. anytimefitness@gmail.com" 
//                             id="enail" 
//                             name="email"/>
//                         <label htmlFor="password">Password</label>
//                         <input 
//                             value = {password} onChange={(e) => setPassword(e.target.value)} 
//                             type = "password" 
//                             placeholder="********" 
//                             id="password" 
//                             name="password"/>
//                     </form>
//                 </div>

//                 {/* register button */}
//                 <div>
//                     <div>
//                         <button>Register</button>
//                     </div>
//                     <div>
//                         <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login Here</button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//       )
// }