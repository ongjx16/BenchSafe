import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebase-config"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, updateEmail, updatePassword, onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  // const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email)
  // }

  function updateemail(email) {
    return updateEmail(currentUser,email)
  }

  function updatepassword(password) {
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
      setCurrentUser(currentUser);
    })
    return () => {
      unsubscribe();
    }
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateemail,
    updatepassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}