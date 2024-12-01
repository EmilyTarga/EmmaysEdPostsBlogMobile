import { StyleSheet, StatusBar, Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native';

export default function User() {
  const { id, IsAdmin } = useLocalSearchParams();

  interface User {
    _id: string,
    username: string,
    password: string,
    IsAdmin: boolean,
    __v: string
  }

  const [user, setUser] = useState<User>();
  const [isChecked, setChecked] = useState(false);
  const { register, setValue, handleSubmit } = useForm()

  const fetchData = async () => {
    const userData =
      await fetch(`${process.env.EXPO_PUBLIC_API_URI}/user/${id}`).then(
        (res) => {
          return res.json()
        }
      )

    const castUser = userData as User

    setValue("username", castUser.username)
    setValue("password", castUser.password)
    setChecked(castUser.IsAdmin)

    setUser(castUser)

  }

  const onSubmit = async (data: any) => {
    const { username, password } = data;

    if (id !== "0") {

      await fetch(`${process.env.EXPO_PUBLIC_API_URI}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ username, password, IsAdmin })
      }).catch((err) => { console.log(err) })

    } else {
      console.log(JSON.stringify({ username, password, IsAdmin: IsAdmin == 'true' }))


      await fetch(`${process.env.EXPO_PUBLIC_API_URI}/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, password, IsAdmin: IsAdmin == 'true' })
      }).catch((err) => { console.log(err) })

    }
    router.back()
  }

  const onDelete = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/user/${id}`, {
      method: "DELETE",
    }).catch((err) => { console.log(err) })

    router.back()
  }

  useEffect(() => {
    register('username')
    register('password')

    fetchData();
  }, [register])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            defaultValue={user?.username}
            style={styles.input}
            onChangeText={text => setValue('username', text)}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            defaultValue={user?.password}
            style={styles.input}
            onChangeText={text => setValue('password', text)}
          />
        </View>

        <Pressable
          onPress={
            () => router.back()}
          style={styles.button}
        >
          <Text style={styles.text}>Back</Text>
        </Pressable>
        <Pressable
          onPress={
            handleSubmit(onSubmit)}
          style={styles.buttonSave}
        >
          <Text style={styles.text}>Save</Text>
        </Pressable>

        <Pressable
          onPress={
            () => onDelete()}
          style={styles.buttonDelete}
        >
          <Text style={styles.text}>Delete</Text>
        </Pressable>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  item: {
    backgroundColor: 'rgb(25, 181, 254)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
  summary: {
    fontSize: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    marginBottom: 12,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'rgb(25, 181, 254)',
    fontSize: 20,
  },

  inputTextArea: {
    backgroundColor: 'white',
    borderColor: 'rgb(25, 181, 254)',
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  button: {
    width: '90%',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgb(25, 181, 254)',
    marginBottom: 10,
  },

  buttonSave: {
    width: '90%',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'green',
    marginBottom: 10,
  },

  buttonDelete: {
    width: '90%',
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'
  },
  viewInput: {
    width: '90%'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left'
  },
});
