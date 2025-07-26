// import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
// import { Form, useLoaderData, useSubmit, useNavigate } from "@remix-run/react";
// import { useState } from "react";
// import {
//   ShoppingCart,
//   Plus,
//   Minus,
//   Trash2,
//   Truck,
//   Shield,
//   CreditCard,
//   ArrowRight,
//   Clock,
// } from "lucide-react";
// import { Link } from "@remix-run/react";
// import {
//   getSession,
//   getOrCreateCart,
//   commitSession,
// } from "../../lib/security/session.server";
// import { CartService } from "../../services/cart.server";
// import { authenticator } from "../../lib/security/auth.server";
// import { createCsrfToken, verifyCsrfToken } from "../../lib/utils.server";
// import { useCart } from "../../hooks/useCart";
// import AuntyMasalaMaking from "../assets/home/market_vendor.png";
// import type { Cart } from "../../types/Cart";
// import type { PaymentMethod } from "../../types/Order";

// // Cart Item Component
// const CartItem = ({
//   item,
//   onUpdateQuantity,
//   onRemove,
// }: {
//   item: {
//     productId: string;
//     name: string;
//     description: string;
//     price: number;
//     originalPrice?: number;
//     quantity: number;
//     image: string;
//     inStock: boolean;
//     category: string;
//   };
//   onUpdateQuantity: (productId: string, quantity: number) => void;
//   onRemove: (productId: string) => void;
// }) => {
//   const discount = item.originalPrice
//     ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
//     : 0;

//   const totalPrice = item.price * item.quantity;
//   const totalOriginalPrice = item.originalPrice
//     ? item.originalPrice * item.quantity
//     : null;

//   return (
//     <div className="product-card animate-stagger">
//       <div className="flex gap-4">
//         <div className="flex-shrink-0">
//           <img
//             src={item.image}
//             alt={item.name}
//             className="w-20 h-20 object-cover rounded-lg"
//           />
//           {discount > 0 && (
//             <div className="bg-destructive text-destructive-foreground px-1 py-0.5 rounded text-xs font-bold mt-1 text-center">
//               {discount}% OFF
//             </div>
//           )}
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex justify-between items-start mb-2">
//             <div>
//               <h3 className="font-playfair font-semibold text-lg text-foreground">
//                 {item.name}
//               </h3>
//               <p className="text-muted-foreground text-sm">
//                 {item.description}
//               </p>
//             </div>
//             <button
//               onClick={() => onRemove(item.productId)}
//               className="text-muted-foreground hover:text-destructive transition-colors p-1"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold text-primary">
//                 ₹{totalPrice.toFixed(2)}
//               </span>
//               {totalOriginalPrice && (
//                 <span className="text-sm text-muted-foreground line-through">
//                   ₹{totalOriginalPrice.toFixed(2)}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center border border-border rounded-lg">
//                 <button
//                   onClick={() =>
//                     onUpdateQuantity(item.productId, item.quantity - 1)
//                   }
//                   disabled={item.quantity <= 1}
//                   className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <Minus className="w-4 h-4" />
//                 </button>
//                 <span className="px-4 py-2 font-semibold text-foreground">
//                   {item.quantity}
//                 </span>
//                 <button
//                   onClick={() =>
//                     onUpdateQuantity(item.productId, item.quantity + 1)
//                   }
//                   className="p-2 hover:bg-muted transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//           {!item.inStock && (
//             <div className="mt-2 text-destructive text-sm font-medium">
//               Out of Stock
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Order Summary Component
// const OrderSummary = ({
//   cartItems,
//   promoCode,
//   setPromoCode,
// }: {
//   cartItems: Array<{
//     productId: string;
//     name: string;
//     description: string;
//     price: number;
//     originalPrice?: number;
//     quantity: number;
//     image: string;
//     inStock: boolean;
//     category: string;
//   }>;
//   promoCode: string;
//   setPromoCode: (code: string) => void;
// }) => {
//   const submit = useSubmit();
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const originalSubtotal = cartItems.reduce((sum, item) => {
//     const price = item.originalPrice || item.price;
//     return sum + price * item.quantity;
//   }, 0);
//   const discount = originalSubtotal - subtotal;
//   const promoDiscount = promoCode === "PICKLE10" ? subtotal * 0.1 : 0;
//   const shipping = subtotal >= 500 ? 0 : 50;
//   const total = subtotal - promoDiscount + shipping;

//   return (
//     <div className="bg-card border border-border rounded-lg p-6">
//       <h3 className="font-playfair font-semibold text-xl text-foreground mb-4">
//         Order Summary
//       </h3>
//       <div className="space-y-3 mb-4">
//         <div className="flex justify-between text-muted-foreground">
//           <span>
//             Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
//             items)
//           </span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>
//         {discount > 0 && (
//           <div className="flex justify-between text-green-600">
//             <span>Product Discounts</span>
//             <span>-₹{discount.toFixed(2)}</span>
//           </div>
//         )}
//         {promoDiscount > 0 && (
//           <div className="flex justify-between text-green-600">
//             <span>Promo Code Discount</span>
//             <span>-₹{promoDiscount.toFixed(2)}</span>
//           </div>
//         )}
//         <div className="flex justify-between text-muted-foreground">
//           <span>Shipping</span>
//           <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
//         </div>
//         {shipping > 0 && (
//           <div className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
//             <Truck className="w-4 h-4 inline mr-1" />
//             Add ₹{(500 - subtotal).toFixed(2)} more for FREE shipping!
//           </div>
//         )}
//       </div>
//       <Form
//         method="post"
//         className="mb-4"
//         onSubmit={(e) => {
//           e.preventDefault();
//           const formData = new FormData(e.currentTarget);
//           formData.append("action", "applyPromo");
//           submit(formData, { method: "post" });
//         }}
//       >
//         <input type="hidden" name="csrf" value={createCsrfToken()} />
//         <div className="flex gap-2">
//           <input
//             type="text"
//             name="promoCode"
//             placeholder="Enter promo code"
//             value={promoCode}
//             onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//             className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
//           />
//           <button type="submit" className="btn-hero px-4 py-2 text-sm">
//             Apply
//           </button>
//         </div>
//         <div className="text-xs text-muted-foreground mt-1">
//           Try: PICKLE10 for 10% off
//         </div>
//       </Form>
//       <div className="border-t border-border pt-4">
//         <div className="flex justify-between items-center text-lg font-bold text-foreground">
//           <span>Total</span>
//           <span>₹{total.toFixed(2)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Loader
// // app/routes/store.cart.tsx
// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     const { cart, session } = await getOrCreateCart(request);
//     const { cartItems, isCheckOut } = await CartService.getCart(
//       session.get("userId"),
//       cart.cartId
//     );
//     const csrfToken = createCsrfToken();
//     session.set("csrf", csrfToken);
//     return json(
//       { cartItems, isCheckOut, csrfToken },
//       {
//         headers: {
//           "Set-Cookie": await commitSession(session),
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Cart loader error:", error);
//     return json(
//       {
//         cartItems: [],
//         isCheckOut: false,
//         csrfToken: createCsrfToken(),
//         error: "Failed to load cart",
//       },
//       { status: 500 }
//     );
//   }
// }

// // Action
// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const action = formData.get("action");
//   const session = await getSession(request.headers.get("Cookie"));
//   const userId = session.get("userId");
//   const cartId = session.get("cartId");
//   const csrfToken = formData.get("csrf") as string;

//   await verifyCsrfToken(request, csrfToken);

//   if (action === "updateQuantity") {
//     const productId = formData.get("productId") as string;
//     const quantity = parseInt(formData.get("quantity") as string);
//     await CartService.updateQuantity(userId, cartId, productId, quantity);
//     return json(
//       { success: true },
//       { headers: { "Set-Cookie": await commitSession(session) } }
//     );
//   }

//   if (action === "removeItem") {
//     const productId = formData.get("productId") as string;
//     await CartService.removeFromCart(userId, cartId, productId);
//     return json(
//       { success: true },
//       { headers: { "Set-Cookie": await commitSession(session) } }
//     );
//   }

//   if (action === "clearCart") {
//     await CartService.clearCart(userId, cartId);
//     return json(
//       { success: true },
//       { headers: { "Set-Cookie": await commitSession(session) } }
//     );
//   }

//   if (action === "applyPromo") {
//     const promoCode = formData.get("promoCode") as string;
//     const coupon = await CouponModel.findOne({ code: promoCode }).lean();
//     if (!coupon) {
//       return json({ error: "Invalid promo code" }, { status: 400 });
//     }
//     return json({ success: true, promoCode });
//   }

//   if (action === "checkout") {
//     const user = await authenticator.isAuthenticated(request, {
//       failureRedirect: "/_thop_.login?redirect=/store/cart",
//     });
//     const shippingAddress = JSON.parse(
//       formData.get("shippingAddress") as string
//     );
//     const paymentMethod = formData.get("paymentMethod") as PaymentMethod;
//     const couponCode = formData.get("couponCode") as string;
//     const orderDetails = await CartService.initiateCheckout(
//       user.userId,
//       cartId,
//       shippingAddress,
//       paymentMethod,
//       couponCode
//     );
//     return json(
//       {
//         order: orderDetails.order,
//         razorpayOrderId: orderDetails.razorpayOrderId,
//       },
//       { headers: { "Set-Cookie": await commitSession(session) } }
//     );
//   }

//   return json({ error: "Invalid action" }, { status: 400 });
// }

// // Main Cart Component
// export default function Cart() {
//   const { cartItems, isCheckOut, csrfToken } = useLoaderData<typeof loader>();
//   const [promoCode, setPromoCode] = useState("");
//   const submit = useSubmit();
//   const navigate = useNavigate();
//   const { updateQuantity, removeItem, clearCart } = useCart();

//   const handleCheckout = () => {
//     submit(
//       {
//         action: "checkout",
//         shippingAddress: JSON.stringify({}), // Replace with actual form data
//         paymentMethod: "razorpay",
//         couponCode: promoCode,
//         csrf: csrfToken,
//       },
//       { method: "post" }
//     );
//   };

//   const isEmpty = cartItems.length === 0;

//   if (isEmpty) {
//     return (
//       <div className="min-h-screen">
//         <section className="relative py-16 lg:py-24 bg-gradient-warm">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h1 className="hero-title mb-6">
//               Your <span className="text-turmeric">Cart</span>
//             </h1>
//           </div>
//         </section>
//         <section className="py-16">
//           <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <div className="bg-card border border-border rounded-lg p-12">
//               <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
//               <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">
//                 Your cart is empty
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Looks like you haven't added any delicious pickles to your cart
//                 yet.
//               </p>
//               <Link
//                 to="/store/products"
//                 className="btn-hero inline-flex items-center gap-2"
//               >
//                 Start Shopping
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <section className="relative py-16 lg:py-24 bg-secondary/30 texture-overlay">
//         <div className="absolute inset-0 -z-10">
//           <img
//             src={AuntyMasalaMaking}
//             alt="aunty-masala-making"
//             className="w-full h-full object-cover opacity-30 blur-sm"
//           />
//         </div>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="hero-title mb-6">
//             Your <span className="text-turmeric">Cart</span>
//           </h1>
//           <p
//             className="hero-subtitle animate-fade-up"
//             style={{ animationDelay: "0.2s" }}
//           >
//             Review your selected pickles and proceed to checkout
//           </p>
//         </div>
//       </section>
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="font-playfair text-2xl font-bold text-foreground">
//                   Cart Items ({cartItems.length})
//                 </h2>
//                 <button
//                   onClick={clearCart}
//                   className="text-muted-foreground hover:text-destructive transition-colors text-sm"
//                 >
//                   Clear all items
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {cartItems.map((item, index) => (
//                   <div
//                     key={item.productId}
//                     className="animate-stagger"
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <CartItem
//                       item={item}
//                       onUpdateQuantity={updateQuantity}
//                       onRemove={removeItem}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-8">
//                 <Link
//                   to="/store/products"
//                   className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
//                 >
//                   <ArrowRight className="w-4 h-4 rotate-180" />
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//             <div className="lg:col-span-1">
//               <div className="space-y-6 sticky top-6">
//                 <OrderSummary
//                   cartItems={cartItems}
//                   promoCode={promoCode}
//                   setPromoCode={setPromoCode}
//                 />
//                 <div className="bg-card border border-border rounded-lg p-4">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                       <Shield className="w-4 h-4 text-green-600" />
//                       <span>Secure Checkout</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                       <Truck className="w-4 h-4 text-blue-600" />
//                       <span>Free shipping on orders ₹500+</span>
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                       <Clock className="w-4 h-4 text-orange-600" />
//                       <span>Delivery in 2-3 business days</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleCheckout}
//                   disabled={
//                     isCheckOut || cartItems.some((item) => !item.inStock)
//                   }
//                   className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <CreditCard className="w-4 h-4" />
//                   Proceed to Checkout
//                 </button>
//                 <div className="text-center text-sm text-muted-foreground">
//                   <p className="mb-2">Accepted Payment Methods</p>
//                   <div className="flex justify-center gap-2">
//                     <div className="bg-muted rounded px-2 py-1 text-xs">
//                       Cards
//                     </div>
//                     <div className="bg-muted rounded px-2 py-1 text-xs">
//                       UPI
//                     </div>
//                     <div className="bg-muted rounded px-2 py-1 text-xs">
//                       Wallets
//                     </div>
//                     <div className="bg-muted rounded px-2 py-1 text-xs">
//                       COD
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="py-16 bg-muted/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-foreground mb-4">
//               You Might Also Like
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Complete your pickle collection with these popular choices
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="product-card text-center">
//                 <img
//                   src="/placeholder.png"
//                   alt="Recommended Pickle"
//                   className="w-24 h-24 object-cover rounded-lg mx-auto mb-4"
//                 />
//                 <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
//                   Recommended Pickle {i}
//                 </h3>
//                 <p className="text-muted-foreground text-sm mb-4">
//                   Delicious traditional recipe
//                 </p>
//                 <button className="btn-secondary text-sm px-4 py-2">
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
