import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signInWithCredential, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/firebase.config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);

          let stripeCustomerId;

          if (!userSnap.exists()) {
            // Check if a Stripe customer already exists for this email
            const existingCustomers = await stripe.customers.list({
              email: user.email,
              limit: 1,
            });

            if (existingCustomers.data.length > 0) {
              stripeCustomerId = existingCustomers.data[0].id;
            } else {
              // Create a new Stripe customer
              const stripeCustomer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: {
                  firebaseUserId: user.id,
                },
              });
              stripeCustomerId = stripeCustomer.id;
            }

            // Create a new user document
            await setDoc(userRef, {
              name: user.name,
              email: user.email,
              image: user.image,
              createdAt: new Date(),
              lastLoginAt: new Date(),
              subscriptionStatus: "trialing",
              projects: {},
              stripeCustomerId: stripeCustomerId,
            });
          } else {
            // User exists, update last login
            await updateDoc(userRef, {
              lastLoginAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      try {
        const userDocRef = doc(db, "users", token.sub);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          session.user = {
            ...session.user,
            id: token.sub,
            subscriptionStatus: userData.subscriptionStatus,
            lastLoginAt: userData.lastLoginAt,
            projects: userData.projects || [],
          };
        } else {
          session.user = {
            ...session.user,
            id: token.sub,
            subscriptionStatus: "trialing",
            lastLoginAt: new Date(),
            projects: [],
          };
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        session.user = {
          ...session.user,
          id: token.sub,
          subscriptionStatus: "trialing",
          lastLoginAt: new Date(),
          projects: [],
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
