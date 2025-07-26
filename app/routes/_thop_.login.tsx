// import { Form, useActionData, useLoaderData } from "@remix-run/react";
// import {
//   json,
//   redirect,
//   type LoaderFunctionArgs,
//   type ActionFunctionArgs,
// } from "@remix-run/node";
// import { authenticator } from "../lib/security/auth.server";
// import { getSession } from "../lib/security/session.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const session = await getSession(request);
//   if (session.get("userId")) return redirect("/_thop.store.products");

//   const url = new URL(request.url);
//   const redirectTo =
//     url.searchParams.get("redirectTo") || "/_thop.store.products";
//   return json({ redirectTo });
// }

// export async function action({ request }: ActionFunctionArgs) {
//   return authenticator.authenticate("user-pass", request, {
//     successRedirect: "/_thop.store.products",
//     failureRedirect: "/login",
//   });
// }

// export default function LoginPage() {
//   const { redirectTo } = useLoaderData<typeof loader>();
//   const actionData = useActionData<{ error?: string }>();

//   return (
//     <Form method="post">
//       <input type="hidden" name="redirectTo" value={redirectTo} />
//       {actionData?.error && <p className="text-red-500">{actionData.error}</p>}

//       <input type="email" name="email" placeholder="Email" required />
//       <input type="password" name="password" placeholder="Password" required />
//       <button type="submit">Login</button>
//     </Form>
//   );
// }
