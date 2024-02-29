import {useAppwriteService} from '../appwrite/provider';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {Loading} from '../components/loading';

export default function Router() {
  const {loading, isLoggedIn} = useAppwriteService();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
