import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const userInfo = 'You are currently not logged in!';

  return (
    <View style={styles.container}>
      <View style={styles.profilePic}>
        <Ionicons name='person' size={60} color='white' />
      </View>
      <Text style={styles.userInfo}>{userInfo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profilePic: {
    width: 100,
    height: 100,
    backgroundColor: '#bbb',
    alignSelf: 'center',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130,
  },
  userInfo: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 30,
    letterSpacing: 0.4,
  },
});
