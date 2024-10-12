import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {
  InvalidActiveAccountError,
  InvalidEmailPasswordError,
} from './utils/error';
import { sendRequest } from './utils/api';
import { IUser } from './types/next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('>>> check credentials', credentials);

        const res = await sendRequest<IBackendRes<ILogin>>({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/auth/login`,
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        });
        console.log('>>> check res', res);

        if (res.statusCode === 201) {
          // Đảm bảo rằng đối tượng trả về là kiểu User
          const user = res.data?.user;
          if (user) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
            };
          }
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InvalidActiveAccountError();
        } else {
          throw new Error('Internal Server Error');
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
