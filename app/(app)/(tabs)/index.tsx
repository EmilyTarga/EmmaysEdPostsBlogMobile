import { StyleSheet, FlatList, StatusBar, TextInput, Button, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useSession } from '@/app/ctx';


export default function HomeScreen() {
  const { signOut } = useSession();

  interface Post {
    _id: string,
    title: string,
    content: string,
    subject: string,
    author: string,
    __v: string
  }

  const [data, setData] = useState(Array<Post>);
  const [search, setSearch] = useState("");

  async function fetchData() {
    try {

      const postsData =
        await fetch(`${process.env.EXPO_PUBLIC_API_URI}/posts/search?search=${search}&page=1&limit=999`).then(
          (res) => {
            return res.json()
          }
        )

      const castPost = postsData as Array<Post>
      setData(castPost)

    } catch (err) {
      console.log(err);
    }

  }

  const handleChange = (text: string) => {
    setSearch(text);
    fetchData();
  }

  useEffect(() => {
    fetchData();
  })
  type ItemProps = {
    title: string,
    subject: string,
    author: string
  };

  const Item = ({ title, subject, author }: ItemProps) => (
    <ThemedView style={styles.item}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.summary}>{subject}</ThemedText>
      <ThemedText style={styles.summary}>{author}</ThemedText>
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
            pathname: '/Post/[id]',
            params: { id: "0" }
          }}>
          Create Post
        </Link>

        <TextInput
          style={styles.input}
          onChangeText={handleChange}
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
                pathname: '/Post/[id]',
                params: { id: item._id }
              }}>
              <Item
                title={item.title}
                subject={item.subject}
                author={item.author}
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
  }
});
