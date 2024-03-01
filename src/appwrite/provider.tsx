import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AppwriteService from './service';
import Snackbar from 'react-native-snackbar';

type AppwriteCtxType = {
  appwrite: AppwriteService;
  logout: () => void;
  isLoggedIn: boolean;
  loading: boolean;
  updateUserLoggedInStatus: (loggedInStatus: boolean) => void;
};

const AppwriteContext = createContext<AppwriteCtxType>({
  appwrite: new AppwriteService(),
  logout: () => {},
  isLoggedIn: false,
  updateUserLoggedInStatus: () => {},
  loading: false,
});

export const useAppwriteService = () => {
  if (!AppwriteContext) {
    throw new Error('Please wrap your component inside AppwriteProvider');
  }

  return useContext(AppwriteContext);
};

export const AppwriteProvider = ({children}: {children: ReactNode}) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const appwriteRef = useRef(new AppwriteService());

  useEffect(() => {
    (async function getUser() {
      try {
        setLoading(true);
        const userModel = await appwriteRef.current.getCurentUser();
        if (userModel) {
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        Snackbar.show({
          text: 'Failed to load current user info',
          duration: Snackbar.LENGTH_SHORT,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateUserLoggedInStatus = (loggedInStatus: boolean) =>
    setIsUserLoggedIn(loggedInStatus);

  const handleLogout = async () => {
    try {
      await appwriteRef.current.logout();
      setIsUserLoggedIn(false);
      Snackbar.show({
        text: 'Successfully logged out',
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong. Failed to logout',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const value: AppwriteCtxType = {
    appwrite: appwriteRef.current,
    logout: handleLogout,
    isLoggedIn: isUserLoggedIn,
    updateUserLoggedInStatus,
    loading,
  };

  return (
    <AppwriteContext.Provider value={value}>
      {children}
    </AppwriteContext.Provider>
  );
};
