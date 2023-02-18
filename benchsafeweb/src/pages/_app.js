import React, { useState } from "react";
import '@/styles/globals.css'
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";

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
      //<Component {...pageProps} />
  );
}

export default App;