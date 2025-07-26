import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
// import { connectToDatabase } from "../utils/db.server";

// connectToDatabase().catch((err) => {
//   console.error("Failed to connect to database:", err);
//   process.exit(1);
// });

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  return redirect("/home");
};

export default function Index() {
  return null; // This won't render since we're redirecting
}
