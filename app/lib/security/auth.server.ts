// // lib/security/auth.server.ts
// import { redirect } from "@remix-run/node";
// import { Authenticator } from "remix-auth";
// import { sessionStorage } from "./session.server";
// import { FormStrategy } from "remix-auth-form";
// import { UserModel } from "../../models/user.model"; // Assuming you have a User model

// export interface AuthUser {
//   id: string;
//   email: string;
//   role: string;
//   isActive: boolean; // Add isActive to match session.server.ts
// }

// export const authenticator = new Authenticator<AuthUser | null>(sessionStorage);

// authenticator.use(
//   new FormStrategy(async ({ form }) => {
//     const email = form.get("email") as string;
//     const password = form.get("password") as string;

//     // Implement authentication logic
//     const user = await UserModel.findOne({ email }).lean();
//     if (!user) {
//       throw new Error("Invalid email or password");
//     }

//     // Verify password (use bcrypt or similar for secure comparison)
//     const isPasswordValid = await verifyPassword(password, user.passwordHash); // Implement this
//     if (!isPasswordValid) {
//       throw new Error("Invalid email or password");
//     }

//     if (!user.isActive) {
//       throw new Error("Account is not active");
//     }

//     return {
//       id: user._id.toString(),
//       email: user.email,
//       role: user.role || "user",
//       isActive: user.isActive || true,
//     };
//   }),
//   "user-pass"
// );

// export async function getUser(request: Request) {
//   return await authenticator.isAuthenticated(request);
// }

// export async function requireLogin(
//   request: Request,
//   redirectTo: string = "/login"
// ) {
//   const user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     const url = new URL(request.url);
//     throw redirect(
//       `${redirectTo}?redirectTo=${encodeURIComponent(
//         url.pathname + url.search
//       )}`
//     );
//   }
//   return user;
// }

// export async function requireAdmin(request: Request) {
//   const user = await authenticator.isAuthenticated(request);
//   if (!user) {
//     throw redirect("/login?redirectTo=/thop.admin");
//   }

//   if (user.role !== "admin") {
//     throw redirect("/admin", { status: 403 });
//   }

//   return user;
// }
