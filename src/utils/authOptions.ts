import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Database
import { connectDB } from "@/config/database";
// Model
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();

      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile?.email });

      // 3. If user does not exist, create user
      if (!userExists) {
        const username = profile?.name?.slice(0, 20);

        await User.create({
          username,
          email: profile?.email,
          image: profile?.image,
        });
      }

      // 4. Return true
      return true;
    },

    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      await connectDB();
      const user = await User.findOne({ email: session.user?.email });

      // 2. Assign the user id from the session
      if (session.user && user) {
        session.user.id = user._id.toString();
      }

      // 3. Return the session object
      return session;
    },
  },
};
