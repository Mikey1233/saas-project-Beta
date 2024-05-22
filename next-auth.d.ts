import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    firebaseToken? : string
    user: {
      id: String;
    } & DefaultSession["user"];
  }
}