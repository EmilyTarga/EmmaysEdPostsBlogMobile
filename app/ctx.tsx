import { useContext, createContext, type PropsWithChildren, useState } from 'react';

interface User {
  _id: string,
  username: string,
  IsAdmin: string,
  __v: string
}

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<User> | undefined;
  signOut: () => void;
  session?: User | null;
}>({
  signIn: () => undefined,
  signOut: () => null,
  session: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<User>()

  const userLogin = async (username: string, password: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URI}/user/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json()).catch((err) => {
      throw new Error(err)
    });

    if (response.statusCode == '404') {
      throw new Error("User not found")
    }

    const userData = await response as User;
    setSession(userData)
    return userData
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username, password): Promise<User> => {
          const user = await userLogin(username, password);
          console.log(user)
          return user
        },
        signOut: () => {
          setSession(undefined)
        },
        session,
      }}>
      {children}
    </AuthContext.Provider >
  );
}

