import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { connectDb } from '@lib/database';
import User from '@lib/database/models/user.model';
import { handleError } from '@utils';

export const OPTIONS = {
  providers: [
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    //Customised authentication
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        await connectDb();
        try {
          const user = await User.findOne({ email: credentials?.email });

          const passwordChecked = !user.isGoogleAuth && !(await bcrypt.compare(credentials.password, user.password))
          if (!user || passwordChecked) {
            throw new Error("User not found");
          }
          return user;
        } catch (err) {
          return handleError(err.message);
        }
      },
      credentials: undefined
    })
  ],
  callbacks: {
    async session({ session }) {
      await connectDb();      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        return credentials;
      } catch (error) {
        return false
      }
    },

    pages: {
      error: "/error",
    },
  },
}