import GoogleProvider from "next-auth/providers/google";
export const options = {
  secret: process.env.SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};
