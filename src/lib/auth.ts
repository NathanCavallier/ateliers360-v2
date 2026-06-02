import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ateliers360.fr";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!NEXTAUTH_SECRET) {
    console.error("NEXTAUTH_SECRET is missing. Admin authentication is misconfigured.");
    throw new Error("NEXTAUTH_SECRET is required");
}

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    typeof credentials?.email !== "string" ||
                    typeof credentials?.password !== "string"
                ) {
                    return null;
                }

                if (credentials.email !== ADMIN_EMAIL) {
                    return null;
                }

                if (!ADMIN_PASSWORD_HASH) {
                    console.error(
                        "ADMIN_PASSWORD_HASH is missing. Refusing admin authentication."
                    );
                    return null;
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    ADMIN_PASSWORD_HASH
                );

                if (!isValidPassword) {
                    return null;
                }

                return {
                    id: "admin",
                    email: ADMIN_EMAIL,
                    name: "Nathan Imogo",
                };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isOnLogin = nextUrl.pathname === "/admin/login";

            if (isOnAdmin && !isOnLogin) {
                if (!isLoggedIn) return false; // Redirect to login
                return true;
            }

            if (isLoggedIn && isOnLogin) {
                return Response.redirect(new URL("/admin", nextUrl));
            }

            return true;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
