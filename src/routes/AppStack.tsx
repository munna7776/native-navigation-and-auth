import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';

type AppStackRoute = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackRoute>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
