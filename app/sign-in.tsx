import { router } from 'expo-router';
import { useSession } from './ctx';
import { SafeAreaView, StyleSheet, StatusBar, TextInput, View, Text } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useSession();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} >

        <View style={styles.viewInput}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
        </View>

        <Text
          style={[styles.link, { width: '20%', backgroundColor: 'white', color: 'black', borderColor: 'rgb(25, 181, 254)', borderWidth: 1, fontWeight: '400' }]}
          onPress={async () => {
            try {
              let success = await signIn(username, password);
              success && router.replace('/')
            } catch (err) {
              console.log(err)
            }
          }}>
          Sign In
        </Text>
      </SafeAreaView>
    </SafeAreaProvider >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingBottom: 50,
    color: '#000'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  item: {
    backgroundColor: 'rgb(25, 181, 254)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  cardList: {
    width: "90%"
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
    borderColor: 'rgb(25, 181, 254)'
  },
  title: {
    fontSize: 25,
  },
  summary: {
    fontSize: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'rgb(25, 181, 254)',
    width: '90%',
  },
  link: {
    width: '90%',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(25, 181, 254)',
  },
  viewInput: {
    width: '90%'
  },

});
