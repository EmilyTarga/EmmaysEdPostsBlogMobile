import { StyleSheet, StatusBar, Pressable, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { useSession } from '@/app/ctx';

export default function Post() {
  const { session } = useSession();
  const { id } = useLocalSearchParams();

  interface Post {
    _id: string,
    title: string,
    content: string,
    subject: string,
    author: string,
    __v: string
  }

  const [post, setPost] = useState<Post>();
  const { register, setValue, handleSubmit } = useForm()

  const fetchData = async () => {
    const postsData =
      await fetch(`${process.env.EXPO_PUBLIC_API_URI}/posts/${id}`).then(
        (res) => {
          return res.json()
        }
      )

    const castPost = postsData as Post

    setValue("title", castPost.title)
    setValue("content", castPost.content)
    setValue("subject", castPost.subject)
    setValue("author", castPost.author)

    setPost(castPost)

  }

  const onSubmit = async (data: any) => {
    const { title, content, subject, author } = data;
    console.log(id)

    if (id !== "0") {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ title, content, subject, author })
      }).catch((err) => { console.log(err) })
    } else {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/posts`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ title, content, subject, author })
      }).catch((err) => { console.log(err) })

    }
    router.back()
  }

  const onDelete = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/posts/${id}`, {
      method: "DELETE",
    }).catch((err) => { console.log(err) })

    router.back()
  }

  useEffect(() => {
    register('title')
    register('content')
    register('subject')
    register('author')

    fetchData();
  }, [register])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewInput}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            defaultValue={post?.title}
            style={styles.input}
            onChangeText={text => setValue('title', text)}
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.label}>Content</Text>
          <TextInput
            defaultValue={post?.content}
            style={styles.inputTextArea}
            onChangeText={text => setValue('content', text)}
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            defaultValue={post?.subject}
            style={styles.input}
            onChangeText={text => setValue('subject', text)}
          />
        </View>

        <View style={styles.viewInput}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            defaultValue={post?.author}
            style={styles.input}
            onChangeText={text => setValue('author', text)}
          />
        </View>

        <Pressable
          onPress={
            () => router.back()}
          style={styles.button}
        >
          <Text style={styles.text}>Back</Text>
        </Pressable>

        {
          session?.IsAdmin &&
          <>
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

          </>
        }

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
