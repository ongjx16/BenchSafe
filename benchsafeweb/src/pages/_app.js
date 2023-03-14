import React, { useState } from "react";
import '@/styles/globals.css'
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";
import { LoadingScreen } from "./LoadingScreen";
import { Home } from "./index";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='App'>
      {
        currentForm === "login" ? <LoginScreen onFormSwitch={toggleForm} /> : <RegisterScreen onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;