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
              isSubscribed: false,
              trialStartAt: new Date(),
              trialEndAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
              subscriptionStatus: "trial", // 'trial', 'active', 'expired', 'canceled'
              subscriptionPlan: null, // e.g., 'basic', 'premium', 'pro'
              subscriptionStartDate: null,
              subscriptionEndDate: null,
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
          session.user.id = token.sub;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
          session.user.isSubscribed = userData.isSubscribed;
          session.user.trialStartAt = userData.trialStartAt;
          session.user.trialEndAt = userData.trialEndAt;
          session.user.subscriptionStatus = userData.subscriptionStatus;
          session.user.subscriptionPlan = userData.subscriptionPlan;
          session.user.subscriptionStartDate = userData.subscriptionStartDate;
          session.user.subscriptionEndDate = userData.subscriptionEndDate;
          session.user.lastLoginAt = userData.lastLoginAt;
          session.user.projects = userData.projects || []; // Add this line to include projects in the session
        } else {
          // Fallback to token data if Firestore data is unavailable
          session.user.id = token.sub;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
          session.user.isSubscribed = false; // Default value
          session.user.trialStartAt = null; // Default value
          session.user.trialEndAt = null; // Default value
          session.user.subscriptionStatus = "trial"; // Default value
          session.user.subscriptionPlan = null; // Default value
          session.user.subscriptionStartDate = null; // Default value
          session.user.subscriptionEndDate = null; // Default value
          session.user.lastLoginAt = new Date(); // Default value
          session.user.projects = []; // Default value
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        // Fallback to token data if Firestore is unavailable
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.isSubscribed = false; // Default value
        session.user.trialStartAt = null; // Default value
        session.user.trialEndAt = null; // Default value
        session.user.subscriptionStatus = "trial"; // Default value
        session.user.subscriptionPlan = null; // Default value
        session.user.subscriptionStartDate = null; // Default value
        session.user.subscriptionEndDate = null; // Default value
        session.user.lastLoginAt = new Date(); // Default value
        session.user.projects = []; // Default value
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
