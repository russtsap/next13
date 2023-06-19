import { NextApiHandler } from "next";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Define the type for the token in the JWT callback
interface JWTCallbackToken {
  role?: string;
  [key: string]: unknown;
}

// Define the type for the callbacks
interface Callbacks {
  jwt?: any;
}

// Define the type for your auth options, extending the base AuthOptions
interface MyAuthOptions extends AuthOptions {
  callbacks?: Partial<Callbacks>;
}

// Create your auth options object
export const authOptions: MyAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token }: { token: JWTCallbackToken }) {
      token.role = "admin";
      return token;
    },
  },
};

// Export NextAuth handler with auth options
const nextAuthHandler: NextApiHandler = NextAuth(authOptions);
export default nextAuthHandler;
