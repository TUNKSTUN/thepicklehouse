// import { LoaderFunction, ActionFunction, json } from "@remix-run/node";
// import { useLoaderData, useSubmit } from "@remix-run/react";
// import { useEffect } from "react";
// import { authenticator } from "../../lib/security/auth.server";
// import { OrderService } from "../../services/order.server";

// export const loader: LoaderFunction = async ({ request }) => {
//   const user = await authenticator.isAuthenticated(request, {
//     failureRedirect: "/_thop_.login?redirect=/store/bankconfirm",
//   });
//   return json({ key: process.env.RAZORPAY_CLIENTAPI_ID });
// };

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const razorpayPaymentId = formData.get("razorpay_payment_id") as string;
//   const razorpayOrderId = formData.get("razorpay_order_id") as string;
//   const razorpaySignature = formData.get("razorpay_signature") as string;

//   // Verify payment with Razorpay (use razorpay.utils.verifyPaymentSignature)
//   // Update OrderModel with payment status
//   await OrderModel.findOneAndUpdate(
//     { razorpayOrderId },
//     { paymentId: razorpayPaymentId, status: "paid" }
//   );

//   return json({ success: true });
// };

// export default function BankConfirm() {
//   const { key, razorpayOrderId } = useLoaderData<typeof loader>();
//   const submit = useSubmit();

//   useEffect(() => {
//     const options = {
//       key,
//       order_id: razorpayOrderId,
//       handler: (response: {
//         razorpay_payment_id: string;
//         razorpay_order_id: string;
//         razorpay_signature: string;
//       }) => {
//         submit(response, { method: "post" });
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   }, [key, razorpayOrderId, submit]);

//   return (
//     <div className="min-h-screen bg-gradient-warm">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h1 className="hero-title">Processing Payment</h1>
//         <p className="hero-subtitle mt-4">
//           Please complete the payment to confirm your order.
//         </p>
//       </div>
//     </div>
//   );
// }
