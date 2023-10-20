import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SCRET,
  debug: process.env.NODE_ENV !== "production",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        mobile_no: { label: "mobile_no", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.mobile_no || !credentials?.password) {
            throw new Error("Invalid Credentials");
          }
          const { mobile_no, password } = credentials;
          const response = await fetch(
            `https://demo.onlineorder.crossdevlogix.com/api/customer/loginwithoutOtp`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                mobile_no,
                password,
              }),
            }
          );
          const { success, data } = await response.json();
          if (success) {
            return data[0] as User;
          }
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
