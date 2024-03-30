//https://www.youtube.com/watch?v=AbUVY16P4Ys
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User does not exist");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return { email: user.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        //console.log("i am inside google");
        const client = await connectToDatabase();

        const db = client.db();

        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });

        if (existingUser) {
          return true;
        }

        const result = await db.collection("users").insertOne({
          name: user.name,
          email: user.email,
        });

        // console.log(user);
        // console.log(account);
        //console.log(profile);
      }
      // console.log("i am outside google");
      // console.log(profile);
      return true;
    },
  },
  session: {
    maxAge: 30 * 60, // Set maxAge to 10 seconds
  },
};
export default NextAuth(authOptions);
