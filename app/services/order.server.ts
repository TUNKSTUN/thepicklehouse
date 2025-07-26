// import {
//   OrderModel,
//   Order,
//   OrderItem,
//   PaymentMethod,
// } from "../models/order.model";
// import { CartModel } from "../models/cart.model";
// import { ProductModel } from "../models/product.model";
// import { UserModel } from "../models/user.model";
// import { CouponService } from "../services/coupon.server";
// import { InventoryService } from "../services/inventorylog.server";
// // import { authenticator } from "../lib/security/session.server";
// import { generateId, EntityType, validateId } from "../lib/utils";
// /* Commented out Razorpay import
// import Razorpay from "razorpay";
// */
// import type { Address } from "../types/User";
// import type { Request } from "@remix-run/node";
// import { environment } from "~/environments/environment";

// /* Commented out Razorpay initialization
// const razorpay = new Razorpay({
//   key_id: environment.RAZORPAY_CLIENTAPI_ID!,
//   key_secret: environment.RAZORPAY_CLIENTAPI_KEY!,
// });
// */

// export class OrderService {
//   /**
//    * Create an order from the user's cart.
//    * @param request - Remix request for user authentication.
//    * @param userId - The ID of the user.
//    * @param shippingAddress - The shipping address for the order.
//    * @param paymentMethod - Payment method (razorpay or cod).
//    * @param couponCode - Optional coupon code.
//    * @returns Order details and Razorpay order ID (if applicable).
//    */
//   static async createOrder(
//     request: Request,
//     userId: string,
//     shippingAddress: Address,
//     paymentMethod: PaymentMethod,
//     couponCode?: string
//   ): Promise<{ order: Order; razorpayOrderId?: string }> {
//     try {
//       if (!validateId(userId, EntityType.User)) {
//         throw new Error("Invalid user ID format");
//       }

//       // const user = await authenticator.isAuthenticated(request);
//       // if (!user || user.userId !== userId) {
//       //   throw new Error("Unauthorized user");
//       // }

//       const cart = await CartModel.findOne({ userId });
//       if (!cart || !cart.items.length) {
//         throw new Error("Cart is empty");
//       }

//       const products = await ProductModel.find({
//         productId: { $in: cart.items.map((item) => item.productId) },
//       }).lean();

//       const items: OrderItem[] = cart.items.map((item) => {
//         const product = products.find((p) => p.productId === item.productId);
//         if (!product) throw new Error(`Product ${item.productId} not found`);
//         const price = product.discount
//           ? product.price * (1 - product.discount / 100)
//           : product.price;
//         return {
//           productId: item.productId,
//           quantity: item.quantity,
//           priceAtPurchase: price,
//         };
//       });

//       // Check stock availability
//       for (const item of items) {
//         const isAvailable = await InventoryService.checkStockAvailability(
//           item.productId,
//           item.quantity
//         );
//         if (!isAvailable) {
//           throw new Error(`Insufficient stock for product ${item.productId}`);
//         }
//       }

//       let totalAmount = items.reduce(
//         (sum, item) => sum + item.priceAtPurchase * item.quantity,
//         0
//       );

//       let appliedCoupon = null;
//       if (couponCode) {
//         const coupon = await CouponService.validateCoupon(
//           couponCode,
//           totalAmount
//         );
//         if (coupon) {
//           appliedCoupon = coupon;
//           totalAmount -= CouponService.calculateDiscount(coupon, totalAmount);
//         } else {
//           throw new Error("Invalid or inapplicable coupon");
//         }
//       }

//       const shipping = totalAmount >= 500 ? 0 : 50;
//       totalAmount += shipping;

//       const orderId = generateId(EntityType.Order);
//       let razorpayOrderId: string | undefined;

//       /* Commented out Razorpay order creation
//       if (paymentMethod === "razorpay") {
//         const razorpayOrder = await razorpay.orders.create({
//           amount: Math.round(totalAmount * 100), // Convert to paise
//           currency: "INR",
//           receipt: `order_${orderId}`,
//         });
//         razorpayOrderId = razorpayOrder.id;
//       }
//       */

//       const order = new OrderModel({
//         orderId,
//         userId,
//         items,
//         totalAmount,
//         paymentStatus: {
//           statusType: paymentMethod === "cod" ? "pending" : "pending",
//         },
//         deliveryStatus: { statusType: "processing", cancellationReason: "" },
//         deliveryEstimate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days estimate
//         shippingAddress,
//         paymentMethod,
//         couponCode: appliedCoupon?.code,
//       });

//       await order.save();

//       // Update inventory and log changes
//       for (const item of items) {
//         await InventoryService.updateStock(
//           item.productId,
//           -item.quantity,
//           "purchase",
//           `Order placed: ${orderId}`,
//           undefined,
//           orderId
//         );
//       }

//       // Update user order history
//       await UserModel.updateOne(
//         { userId },
//         {
//           $push: {
//             orderHistory: items.map((item) => ({
//               productId: item.productId,
//               totalPaid: (item.priceAtPurchase * item.quantity).toFixed(2),
//               purchasedDate: new Date().toISOString(),
//               purchaseStatus: paymentMethod === "cod" ? "pending" : "pending",
//               quantity: item.quantity.toString(),
//             })),
//           },
//           updatedAt: new Date(),
//         }
//       );

//       // Clear cart
//       await CartModel.updateOne({ userId }, { items: [], isCheckOut: false });

//       return { order: order.toObject(), razorpayOrderId };
//     } catch (error) {
//       console.error("OrderService.createOrder error:", error);
//       throw error;
//     }
//   }

//   /**
//    * Verify Razorpay payment and update order status.
//    * @param userId - The ID of the user.
//    * @param paymentData - Razorpay payment details.
//    * @returns Updated order.
//    */
//   /* Commented out entire verifyPayment method as it is specific to Razorpay
//   static async verifyPayment(
//     userId: string,
//     paymentData: {
//       razorpay_payment_id: string;
//       razorpay_order_id: string;
//       razorpay_signature: string;
//     }
//   ): Promise<Order> {
//     try {
//       if (!validateId(userId, EntityType.User)) {
//         throw new Error("Invalid user ID format");
//       }

//       const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//         paymentData;
//       const crypto = await import("crypto");
//       const generatedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//         .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//         .digest("hex");

//       if (generatedSignature !== razorpay_signature) {
//         throw new Error("Invalid payment signature");
//       }

//       const order = await OrderModel.findOne({
//         userId,
//         orderId: razorpay_order_id,
//       }).sort({ createdAt: -1 });
//       if (!order) throw new Error("Order not found");

//       order.paymentStatus.statusType = "paid";
//       order.deliveryStatus.statusType = "processing";
//       await order.save();

//       await UserModel.updateOne(
//         {
//           userId,
//           "orderHistory.productId": {
//             $in: order.items.map((item) => item.productId),
//           },
//         },
//         { $set: { "orderHistory.$.purchaseStatus": "completed" } }
//       );

//       return order.toObject();
//     } catch (error) {
//       console.error("OrderService.verifyPayment error:", error);
//       throw error;
//     }
//   }
//   */

//   /**
//    * Complete COD order.
//    * @param userId - The ID of the user.
//    * @param orderId - The ID of the order.
//    * @returns Updated order.
//    */
//   static async completeCODOrder(
//     userId: string,
//     orderId: string
//   ): Promise<Order> {
//     try {
//       if (!validateId(userId, EntityType.User)) {
//         throw new Error("Invalid user ID format");
//       }
//       if (!validateId(orderId, EntityType.Order)) {
//         throw new Error("Invalid order ID format");
//       }

//       const order = await OrderModel.findOne({
//         userId,
//         orderId,
//         paymentMethod: "cod",
//       });
//       if (!order) throw new Error("COD order not found");

//       order.paymentStatus.statusType = "paid";
//       order.deliveryStatus.statusType = "processing";
//       await order.save();

//       await UserModel.updateOne(
//         {
//           userId,
//           "orderHistory.productId": {
//             $in: order.items.map((item) => item.productId),
//           },
//         },
//         { $set: { "orderHistory.$.purchaseStatus": "completed" } }
//       );

//       return order.toObject();
//     } catch (error) {
//       console.error("OrderService.completeCODOrder error:", error);
//       throw error;
//     }
//   }

//   /**
//    * Get all orders for a user.
//    * @param userId - The ID of the user.
//    * @returns List of orders.
//    */
//   static async getUserOrders(userId: string): Promise<Order[]> {
//     try {
//       if (!validateId(userId, EntityType.User)) {
//         throw new Error("Invalid user ID format");
//       }

//       return await OrderModel.find({ userId })
//         .lean()
//         .then((orders) =>
//           orders.map((order) => ({
//             ...order,
//             orderId: order.orderId,
//             createdAt: order.createdAt.toISOString(),
//             updatedAt: order.updatedAt.toISOString(),
//             deliveryEstimate: order.deliveryEstimate.toISOString(),
//           }))
//         );
//     } catch (error) {
//       console.error("OrderService.getUserOrders error:", error);
//       throw new Error("Failed to fetch orders");
//     }
//   }

//   /**
//    * Cancel an order (admin or user accessible).
//    * @param request - Remix request for authentication.
//    * @param userId - The ID of the user or admin.
//    * @param orderId - The ID of the order.
//    * @param reason - Cancellation reason.
//    * @returns Updated order.
//    */
//   static async cancelOrder(
//     request: Request,
//     userId: string,
//     orderId: string,
//     reason: string
//   ): Promise<Order> {
//     try {
//       if (!validateId(userId, EntityType.User)) {
//         throw new Error("Invalid user ID format");
//       }
//       if (!validateId(orderId, EntityType.Order)) {
//         throw new Error("Invalid order ID format");
//       }
//       if (!reason) {
//         throw new Error("Cancellation reason is required");
//       }

//       const user = await authenticator.isAuthenticated(request);
//       if (!user || (user.userId !== userId && user.role !== "admin")) {
//         throw new Error("Unauthorized to cancel order");
//       }

//       const order = await OrderModel.findOne({ userId, orderId });
//       if (!order) throw new Error("Order not found");

//       order.paymentStatus.statusType = "cancelled";
//       order.deliveryStatus.statusType = "cancelled";
//       order.deliveryStatus.cancellationReason = reason;
//       await order.save();

//       // Restore inventory
//       for (const item of order.items) {
//         await InventoryService.updateStock(
//           item.productId,
//           item.quantity,
//           "manual",
//           `Order cancelled: ${reason}`,
//           user.role === "admin" ? user.userId : undefined,
//           orderId
//         );
//       }

//       return {
//         ...order.toObject(),
//         orderId: order.orderId,
//         createdAt: order.createdAt.toISOString(),
//         updatedAt: order.updatedAt.toISOString(),
//         deliveryEstimate: order.deliveryEstimate.toISOString(),
//       };
//     } catch (error) {
//       console.error("OrderService.cancelOrder error:", error);
//       throw error;
//     }
//   }
// }
