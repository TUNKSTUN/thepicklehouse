// // app/routes/_thop_.register.tsx
// import {
//   json,
//   redirect,
//   ActionFunction,
//   LoaderFunction,
// } from "@remix-run/node";
// import { Form, useActionData } from "@remix-run/react";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Label } from "../components/ui/label";
// import { UserModel } from "../models/user.model";
// import { createSession } from "../lib/security/session.server";
// import bcrypt from "bcryptjs";
// import { v4 as uuidv4 } from "uuid";

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const redirectTo =
//     (formData.get("redirectTo") as string) || "/_thop.store.products";

//   if (!name || !email || !password) {
//     return json(
//       { error: "All fields are required", name, email },
//       { status: 400 }
//     );
//   }

//   const existingUser = await UserModel.findOne({ email }).lean();
//   if (existingUser) {
//     return json(
//       { error: "Email already exists", name, email },
//       { status: 400 }
//     );
//   }

//   const passwordHash = await bcrypt.hash(password, 10);
//   const userId = `USER-${uuidv4().slice(0, 16)}`;
//   const user = new UserModel({
//     userId,
//     name,
//     email,
//     passwordHash,
//     role: "user",
//     isActive: true,
//     address: [],
//     orderHistory: [],
//     wishlist: [],
//   });
//   await user.save();

//   return createSession(userId, redirectTo);
// };

// export default function RegisterPage() {
//   const actionData = useActionData<{
//     error?: string;
//     name?: string;
//     email?: string;
//   }>();
//   return (
//     <div className="max-w-md mx-auto py-16">
//       <h1 className="text-3xl font-bold mb-6">Register</h1>
//       {actionData?.error && (
//         <p className="text-red-500 mb-4">{actionData.error}</p>
//       )}
//       <Form method="post" className="space-y-4">
//         <input type="hidden" name="redirectTo" value="/_thop.store.products" />
//         <div>
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             name="name"
//             type="text"
//             required
//             defaultValue={actionData?.name}
//           />
//         </div>
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             required
//             defaultValue={actionData?.email}
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" name="password" type="password" required />
//         </div>
//         <Button type="submit" className="w-full">
//           Register
//         </Button>
//         <div className="text-sm text-center">
//           Already have an account?{" "}
//           <a href="/_thop_.login" className="text-primary hover:underline">
//             Login
//           </a>
//         </div>
//       </Form>
//     </div>
//   );
// }
