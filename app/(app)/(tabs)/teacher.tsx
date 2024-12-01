import { StyleSheet, FlatList, StatusBar, TextInput, Button, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useSession } from '@/app/ctx';

export default function Teacher() {
  const { signOut } = useSession();

  interface User {
    _id: string,
    username: string,
    IsAdmin: string,
    __v: string
  }

  const [data, setData] = useState(Array<User>);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const usersData =
      await fetch(`${process.env.EXPO_PUBLIC_API_URI}/user?fetchAdmin=true`, {
      }).then(
        (res) => {
          return res.json()
        }
      ).catch((err) => console.log(err))

    const castUsers = usersData as Array<User>
    setData(castUsers)
  }

  useEffect(() => {
    fetchData();
  })
  type ItemProps = {
    username: string,
  };

  const Item = ({ username }: ItemProps) => (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.title}>{username}</ThemedText>
    </ThemedView>

  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} >

        <View style={{ height: '8%', display: 'flex', alignItems: 'flex-end', width: '90%' }}>
          <Text
            style={[styles.link, { width: '20%', backgroundColor: 'white', color: 'black', borderColor: 'rgb(25, 181, 254)', borderWidth: 1, fontWeight: '400' }]}
            onPress={() => {
              // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
              signOut();
            }}>
            Sign Out
          </Text>
        </View>

        <Link
          style={styles.link}
          href={{
            pathname: "/User/[id]",
            params: { id: "0", IsAdmin: 'true' }
          }}>
          Create Teacher
        </Link>

        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search"
        />
        <FlatList
          style={styles.cardList}
          data={data}
          renderItem={({ item }) =>
            <Link
              style={styles.card}
              href={{
                pathname: '/User/[id]',
                params: { id: item._id, IsAdmin: item.IsAdmin }
              }}>
              <Item
                username={item.username}
              />

            </Link>
          }
          keyExtractor={item => item._id}
        />
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
  card: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
    borderColor: 'rgb(25, 181, 254)'
  },

  cardList: {
    width: "90%"
  },

});
