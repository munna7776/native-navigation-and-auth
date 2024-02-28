import {useAppwriteService} from '../appwrite/provider';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {Loading} from '../components/loading';

export default function Router() {
  const {loading, user} = useAppwriteService();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
