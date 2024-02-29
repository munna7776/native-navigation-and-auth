import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import AppwriteService from "./service";
import Snackbar from "react-native-snackbar";

type User = {
  name: string;
  email: string
}

type AppwriteCtxType = {
    appwrite: AppwriteService;
    logout: () => void;
    loading: boolean;
    user: User | null;
    isLoggedIn: boolean;
    updateUserLoggedInStatus: (loggedInStatus: boolean) => void
}

const AppwriteContext = createContext<AppwriteCtxType>({
    appwrite: new AppwriteService(),
    loading: false,
    user: null,
    logout: () => {},
    isLoggedIn: false,
    updateUserLoggedInStatus: () => {}
    
})

export const useAppwriteService = () => {
    if(!AppwriteContext) {
        throw new Error("Please wrap your component inside AppwriteProvider")
    }

    return useContext(AppwriteContext)
}

export const AppwriteProvider = ({children}: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState<User |null>(null)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const appwriteRef = useRef(new AppwriteService())
    
  useEffect(() => {
    (async function getUser() {
      try {
        setLoading(true)
        const userModel = await appwriteRef.current.getCurentUser();
        if (userModel) {
          setUser({name: userModel.name, email: userModel.email})
          setIsUserLoggedIn(true)
        }
      } catch (error) {
        Snackbar.show({
          text: "Failed to load current user info",
          duration: Snackbar.LENGTH_SHORT
        })
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateUserLoggedInStatus = (loggedInStatus: boolean) => setIsUserLoggedIn(loggedInStatus)


  const handleLogout = async() => {
    try {
      await appwriteRef.current.logout()
      setUser(null)
      setIsUserLoggedIn(false)
      Snackbar.show({
        text: "Successfully logged out",
        duration: Snackbar.LENGTH_SHORT
      })
    } catch (error) {
      Snackbar.show({
        text: "Something went wrong. Failed to logout",
        duration: Snackbar.LENGTH_LONG
      })
    }
  }

    const value: AppwriteCtxType = {
        appwrite: appwriteRef.current,
        loading,
        user,
        logout: handleLogout,
        isLoggedIn: isUserLoggedIn,
        updateUserLoggedInStatus
    }

    return (
        <AppwriteContext.Provider value={value} >{children}</AppwriteContext.Provider>
    )
}