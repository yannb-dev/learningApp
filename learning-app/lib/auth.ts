import { PrismaAdapter } from "@auth/prisma-adapter";

import GitHubProvider from "next-auth/providers/github";

import prisma from "@/lib/prisma";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;

      return token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.includes("signout")) return `${baseUrl}/login`; // Attention à prendre en compte si URL redirige vers /signout-page

      if (url.startsWith(baseUrl)) return url;

      return `${baseUrl}/accueil`;
    },
  },
};
