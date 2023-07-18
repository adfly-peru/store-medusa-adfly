import NextAuth, {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // TODO: implement fetch

        // const res = await fetch("/your/endpoint", {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        //     headers: { "Content-Type": "application/json" }
        //   })
        // const user = await res.json()

        const user = {
          id: "1",
          name: "Juan Vargas",
          email: "jvargas@adfly.com",
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
