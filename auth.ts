import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { authConfig } from './auth.config';

export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },
    session: {
        strategy: 'jwt' as const,
        maxAge: 30 * 24 * 60 * 60 //30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(credentials) {
                if (credentials === null) {
                    return null;
                }

                //find user in db
                const user = await prisma.user.findFirst({
                    where: { email: credentials.email as string }
                });

                //check if user exists and password matches
                if (user && user.password) {
                    const isMatch = compareSync(
                        credentials.password as string,
                        user.password
                    );

                    //if password is correct, return user
                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        };
                    }
                }

                //if user does NOT exist or password does not match
                return null;
            }
        })
    ],
    callbacks: {
        //run when session is accessed
        //eslint-disable-next-line
        async session({ session, user, trigger, token }: any) {
            //set user ID from the token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            // if there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name;
            }
            return session;
        },

        //eslint-disable-next-line
        async jwt({ token, user, trigger, session }: any) {
            //assign user fields to token
            if (user) {
                token.id = user.id;
                token.role = user.role;

                //update database to reflect the token
                if (user.name === 'NO_NAME') {
                    token.name = user.email!.split('@')[0];

                    //update database to reflect the token name
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { name: token.name }
                    });
                }
            }
            return token;
        },
        ...authConfig.callbacks
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
