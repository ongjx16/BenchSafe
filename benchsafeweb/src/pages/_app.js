import React, { useState } from "react";
import '@/styles/globals.css'
import { Login } from "./LoginScreen";
import { Register } from "./RegisterScreen";

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className='App'>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
      //<Component {...pageProps} />
  );
}

export default App;