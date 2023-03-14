import { useState } from "react";
import { Link } from "react-router-dom";
// import Button from "../components/Button";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import AboutUs from "./AboutUs";
// import Home from "./Home";
// import Login from "./Login";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase-config";

function App() {
  const [user, setUser] = useState({});


  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto bg-blue-100 rounded-xl shadow border p-8 m-10 ">
        <h2>
          navigation to pages
        </h2>
        <p>
          navigation in header is not done yet so use the links below to navigate first
        </p>
        <div className="pt-2">
          <nav className="p-2">
            <Link to="/Home">Home</Link> |{" "}
            <Link to="/Login">Login</Link> |{" "}
            <Link to="/Signup">Signup</Link> |{" "}
            <Link to="/Preferences">Preferences</Link> |{" "}
          </nav>
          <nav className="p-2">
            <Link to="/AboutUs">About Us</Link> |{" "}
            <Link to="/EditProfile">Edit Profile</Link> |{" "}
            <Link to="/Notifications">Alerts and Notifications</Link> |{" "}
          </nav>
          <nav className="p-2">
            <Link to="/Activities">Activities Page</Link> |{" "}
            <Link to="/ActivityDetails">Activity Details</Link> |{" "}
            <Link to="/Healthcare">Healthcare Services Page</Link> |{" "}
            <Link to="/HealthcareDetails">Healthcare Service Details</Link> |{" "}
          </nav>
        </div>
      </div>
      <div className="container mx-auto bg-blue-100 rounded-xl shadow border p-8 m-10 ">
        <h1 className="underline mb-0">
          styles
        </h1>
        <p className="pt-5 italic">
          try to follow the prefixed styles below
        </p>
        <p className="pb-5 italic">
          [see index.css for font details; see tailwind.config.js for preset colours acc to figma]
        </p>
        <h1>
          <text className="text-yellow">Silver</text>
          Fun Web
        </h1>
        <h2>
          header 2
        </h2>
        <h3>
          header 3
        </h3>
        <h4>
          subheader 1
        </h4>
        <h5>
          subheader 2
        </h5>
        <p>
          body
        </p>
        <Button
          text="Testing Button"
        />
      </div>
      <Footer />
    </div>
  );
}
export default App;

// function App() {
//   const [currentForm, setCurrentForm] = useState('login');

//   const toggleForm = (formName) => {
//     setCurrentForm(formName);
//   }

//   return (
//     <div className='App'>
//       {
//         currentForm === "login" ? <LoginScreen onFormSwitch={toggleForm} /> : <RegisterScreen onFormSwitch={toggleForm} />
//       }
//     </div>
//   );
// }

// export default App;