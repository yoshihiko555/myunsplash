import React, { createContext, useState, useEffect } from 'react'
import { auth, FirebaseUser } from '../assets/ts/firebase'

interface IAuthContext {
  currentUser: FirebaseUser | null | undefined
  isAuth: boolean
}

const AuthContext = createContext<IAuthContext>({ currentUser: null, isAuth: false })

const AuthProvider: React.FC = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<FirebaseUser | null | undefined>(null)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if (user) setIsAuth(true)
      else setIsAuth(false)
    })
  }, [])
  return (
    <AuthContext.Provider value={{currentUser, isAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
