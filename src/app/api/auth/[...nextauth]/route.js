import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signInWithCredential, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/firebase.config";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const credential = GoogleAuthProvider.credential(account.id_token);
        const firebaseAuth = getAuth();
        await signInWithCredential(firebaseAuth, credential);

        // Attempt to interact with Firestore, but handle offline scenario
        try {
          const userDocRef = doc(db, "users", user.id);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              email: user.email,
              name: user.name,
              image: user.image,
              subscriptionStatus: "trialing", // Changed from 'trial' to match Stripe's status
              lastLoginAt: new Date(),
              projects: [],
            });
          }
        } catch (firestoreError) {
          console.warn(
            "Firestore operation failed, possibly offline:",
            firestoreError
          );
          // Continue with sign-in even if Firestore is unavailable
        }

        return true; // Sign-in successful
      } catch (error) {
        console.error("Firebase sign-in error:", error);
        // If the error is due to being offline, allow sign-in
        if (error.code === "unavailable") {
          console.warn("Signing in without Firestore due to offline status");
          return true;
        }
        return false; // Other sign-in errors
      }
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
});

export { handler as GET, handler as POST };
