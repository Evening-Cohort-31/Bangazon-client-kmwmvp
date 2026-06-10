import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { useRouter } from "next/router"

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    const authRoutes = ['/login', '/register']

    // Track whether this effect has been cleaned up so an outdated profile request
    // cannot update state after navigation, logout, or a newer request.
    let ignore = false

    // Clear any previous user's profile when there is no active token.
    if (!token) {
      setProfile({})
      return
    }

    localStorage.setItem('token', token)

    if (!authRoutes.includes(router.pathname)) {
      getUserProfile().then((profileData) => {
        // Only apply the response while it still belongs to the current effect.
        if (!ignore && profileData) {
          setProfile(profileData)
        }
      })
    }

    // Invalidate this request when the component unmounts or the dependencies change.
    return () => {
      ignore = true
    }
    // Refresh the profile when authentication changes or navigation leaves an auth page.
  }, [token, router.pathname])

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
