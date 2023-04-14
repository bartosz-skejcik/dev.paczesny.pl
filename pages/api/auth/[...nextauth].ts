import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            console.log("test");
            let isAllowedToSignIn = true;
            const allowedUser = ["87588698"];
            console.log(user);
            if (allowedUser.includes(String(user.id))) {
                isAllowedToSignIn = true;
            } else {
                isAllowedToSignIn = false;
            }
            return isAllowedToSignIn;
        },
    },
};

export default NextAuth(authOptions);
