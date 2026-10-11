import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

const mongoClient = await clientPromise;
const db = mongoClient.db("bazardor");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET || "",
      enabled: !!process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID || "",
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET || "",
      enabled: !!process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
    },
  },
});
