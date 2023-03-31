import React, { useState } from "react";
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function RegisterScreen() {

  const [gymname, setGymName] = useState("");
  const [gymlocation, setGymLocation] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [cfmPassword, cfmRegisteredPassword] = useState("");
  const [error, setError] = useState("");
  //const { signup } = useAuth()
  //const navigate = useNavigate();

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

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
    <div className="flex flex-row justify-center">
      <div className="auth-form-container">
        <div>
          {/* header */}
          <div>
            <div>
              <h2>Hey there,</h2>
            </div>
            <div>
              <h1 class="mb-10">Create a BenchSafe Account</h1>
            </div>
          </div>

          {/* register information */}
          <form
            className="register-form">
            <label htmlFor="gymname">Gym Name</label>
            <input
              onChange={(event) => { setGymName(event.target.value); }}
              type="gymname"
              id="gymname"
              placeholder="e.g. Anytime Fitness"
              name="gymname" />

            <label htmlFor="gymlocation">Gym Location</label>
            <input
              onChange={(event) => { setGymLocation(event.target.value); }}
              type="gymlocation"
              id="gymlocation"
              placeholder="e.g. Tampines"
              name="gymlocation" />

            <label htmlFor="email">Email</label>
            <input
              onChange={(event) => { setRegisterEmail(event.target.value); }}
              type="email"
              placeholder="e.g. anytimefitness@gmail.com"
              id="enail"
              name="email" />

            <label htmlFor="password">Password</label>
            <input
              onChange={(event) => { setRegisterPassword(event.target.value); }}
              type="password"
              placeholder="********"
              id="password"
              name="password" />

            <label htmlFor="password">Confirm Password</label>
            <input
              onChange={(event) => { cfmRegisteredPassword(event.target.value); }}
              type="cfmpassword"
              placeholder="********"
              id="cfmpassword"
              name="cfmpassword" />
          </form>
        </div>

        {/* register button */}
        <div>
          <div>
            <Link href="/LoginScreen">
              <button className="button">Register</button>
            </Link>
          </div>
          <div>
            <Link href="/LoginScreen">
              <button className="link-btn">Already have an account? Login Here</button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RegisterScreen;