import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {useAppwriteService} from '../appwrite/provider';
import Icon from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';

type User = {
  name: string;
  email: string;
};

export const Home = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const {logout, appwrite} = useAppwriteService();

  useEffect(() => {
    (async function getUser() {
      try {
        setLoading(true);
        const userModel = await appwrite.getCurentUser();
        if (userModel) {
          setUser({name: userModel.name, email: userModel.email});
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
  }, [appwrite]);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {user && (
        <View style={styles.userDetail}>
          <Text style={styles.userText}>Name - {user.name}</Text>
          <Text style={styles.userText}>Email - {user.email}</Text>
        </View>
      )}
      <Pressable style={styles.logout} onPress={logout}>
        <Icon name="logout" size={25} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userDetail: {
    rowGap: 4,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333945',
    alignItems: 'center',
    marginBottom: 4,
  },
  userText: {
    fontSize: 27,
    color: '#2B2B52',
    fontWeight: '600',
  },
  logout: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#333945',
    gap: 10,
    borderRadius: 6,
  },
  logoutText: {
    fontSize: 23,
    lineHeight: 27,
    color: '#fff',
    fontWeight: '500',
  },
  logoutIcon: {
    color: '#fff',
  },
});
