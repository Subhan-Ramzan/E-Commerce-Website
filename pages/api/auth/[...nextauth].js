// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connectDB";
import Signup from "@/models/Signup";
import bcrypt from "bcryptjs";

connectDB();

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        // Fix: Correct fetching of user data
        const user = await Signup.findOne({ "data.email": credentials.email });
        if (!user) {
          throw new Error("No user found with the email");
        }
        const isValid = await bcrypt.compare(credentials.password, user.data.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return user.data; // Return user data
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        return true;
      }
      if (account.provider === "credentials") {
        return user ? true : false;
      }
      return false;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name || session.user.name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.name = user.username;
      }
      return token;
    },
  },
});
