import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Healthcare from "./pages/Healthcare";
import HealthcareDetails from './pages/HealthcareDetails';
import EditProfile from './pages/EditProfile';
import Activities from './pages/Activities';
import ActivityDetails from './pages/ActivityDetails';
import Notifications from './pages/Notifications';
import Preferences from './pages/Preferences';
import GMaps from './components/GMaps';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from '../AuthContext';
import {ActivityLocationProvider} from './ActivityLocationContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ActivityLocationProvider>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/*' element={<Home />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        {/* <Route path='/Home/*' element={<Home />} /> */}
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Activities' element={<Activities />} />
        <Route path='/ActivityDetails' element={<ActivityDetails />} />
        <Route path='/EditProfile' element={<EditProfile />} />
        <Route path='/Healthcare' element={<Healthcare />} />
        <Route path='/HealthcareDetails' element={<HealthcareDetails />} />
        <Route path='/Notifications' element={<Notifications />} />
        <Route path='/Preferences' element={<Preferences />} />
      </Routes>
      </ActivityLocationProvider>
    </AuthProvider>
  </BrowserRouter>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// export default function Home() {
//   return (
//     <>
//       <div>
//         <h1>
//           BenchSafe App
//         </h1>
//         <h2>
//           BenchSafe App
//         </h2>
//         <h3>
//           BenchSafe App
//         </h3>
//         <text>
//           BenchSafe App
//         </text>
//         <div className = "w-screen flex justify-center" >
//           <Button text="BenchSafe App"/>
//         </div>
//         <div className = "text-red-500 flex flex-col">
//           <Link href="/LoginScreen">Login Page</Link>
//           <Link href="/RegisterScreen">Register Page</Link>
//           <Link href="/TensorFlow">Tensor Flow Page</Link>
//           <Link href="/LoadingScreen">Loading Page</Link>
//         </div>
//       </div>
//     </>
//   )
// }
