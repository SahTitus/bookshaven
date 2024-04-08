import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { connectDb } from '@lib/database';
import User from '@lib/database/models/user.model';
import { handleError } from '@utils';

export const OPTIONS = {
  providers: [
    //Customised authentication
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        await connectDb();
        try {
          const user = await User.findOne({ email: credentials?.email });

          const passwordChecked = !(await bcrypt.compare(credentials.password, user.password))
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
      console.log(sessionUser)
      session.user.id = sessionUser._id.toString();
      session.user.image = sessionUser.image;
      session.user.isAdmin = sessionUser.isAdmin;

      console.log(session)

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        return credentials;
      } catch (error) {
        return false
      }
    },

  },
}