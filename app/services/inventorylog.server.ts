// import { ProductModel } from "../models/product.model";
// import { InventoryLogModel } from "../models/inventory.model";
// import { authenticator } from "../lib/security/auth.server";
// import { generateId, validateId, EntityType } from "../lib/utils";
// import type { InventoryLog, InventoryChangeType } from "../types/InventoryLog";
// import type { Request } from "@remix-run/node";

// export class InventoryService {
//   /**
//    * Check if sufficient stock is available for a product (user and admin accessible).
//    * @param productId - ID of the product.
//    * @param quantity - Requested quantity.
//    * @returns True if stock is available, false otherwise.
//    * @throws Error if product is not found or invalid.
//    */
//   static async checkStockAvailability(
//     productId: string,
//     quantity: number
//   ): Promise<boolean> {
//     try {
//       if (!validateId(productId, EntityType.Product)) {
//         throw new Error("Invalid product ID format");
//       }
//       if (quantity < 1) {
//         throw new Error("Quantity must be positive");
//       }

//       const product = await ProductModel.findOne({ productId }).lean();
//       if (!product) {
//         throw new Error(`Product ${productId} not found`);
//       }

//       return product.inStock && product.stock >= quantity;
//     } catch (error) {
//       console.error("InventoryService.checkStockAvailability error:", error);
//       throw new Error("Failed to check stock availability");
//     }
//   }

//   /**
//    * Update product stock and log the change (admin or system accessible).
//    * @param productId - ID of the product.
//    * @param change - Stock change (positive for restock, negative for purchase).
//    * @param type - Type of change (restock, purchase, manual).
//    * @param note - Optional note for the change.
//    * @param adminId - ID of the admin (optional for system actions).
//    * @param orderId - ID of the related order (optional).
//    * @returns Updated inventory log entry.
//    * @throws Error if update fails or invalid inputs.
//    */
//   static async updateStock(
//     productId: string,
//     change: number,
//     type: InventoryChangeType,
//     note?: string,
//     adminId?: string,
//     orderId?: string
//   ): Promise<InventoryLog> {
//     try {
//       if (!validateId(productId, EntityType.Product)) {
//         throw new Error("Invalid product ID format");
//       }
//       if (change === 0) {
//         throw new Error("Stock change must be non-zero");
//       }
//       if (adminId && !validateId(adminId, EntityType.User)) {
//         throw new Error("Invalid admin ID format");
//       }
//       if (orderId && !validateId(orderId, EntityType.Order)) {
//         throw new Error("Invalid order ID format");
//       }

//       const product = await ProductModel.findOne({ productId });
//       if (!product) {
//         throw new Error(`Product ${productId} not found`);
//       }

//       const newStock = product.stock + change;
//       if (newStock < 0) {
//         throw new Error("Insufficient stock for update");
//       }

//       const inventoryId = generateId(EntityType.Inventory);
//       const inventoryLog = new InventoryLogModel({
//         inventoryId,
//         productId,
//         change,
//         type,
//         note,
//         adminId,
//         orderId,
//       });

//       await Promise.all([
//         ProductModel.updateOne(
//           { productId },
//           {
//             stock: newStock,
//             inStock: newStock > 0,
//             updatedAt: new Date(),
//           }
//         ),
//         inventoryLog.save(),
//       ]);

//       return inventoryLog.toObject();
//     } catch (error) {
//       console.error("InventoryService.updateStock error:", error);
//       throw new Error("Failed to update stock");
//     }
//   }

//   /**
//    * Restock a product (admin only).
//    * @param request - Remix request for authentication.
//    * @param productId - ID of the product.
//    * @param quantity - Quantity to restock.
//    * @param note - Optional note for the restock.
//    * @returns Updated inventory log entry.
//    * @throws Error if authentication fails or update fails.
//    */
//   static async restockProduct(
//     request: Request,
//     productId: string,
//     quantity: number,
//     note?: string
//   ): Promise<InventoryLog> {
//     try {
//       const user = await authenticator.requireAdmin(request);
//       if (quantity < 1) {
//         throw new Error("Restock quantity must be positive");
//       }

//       return await InventoryService.updateStock(
//         productId,
//         quantity,
//         "restock",
//         note,
//         user.userId
//       );
//     } catch (error) {
//       console.error("InventoryService.restockProduct error:", error);
//       throw new Error("Failed to restock product");
//     }
//   }

//   /**
//    * Get stock history for a product (admin only).
//    * @param request - Remix request for authentication.
//    * @param productId - ID of the product.
//    * @param limit - Maximum number of log entries to return.
//    * @param skip - Number of log entries to skip.
//    * @returns Array of inventory log entries.
//    * @throws Error if authentication fails or query fails.
//    */
//   static async getStockHistory(
//     request: Request,
//     productId: string,
//     limit: number = 10,
//     skip: number = 0
//   ): Promise<InventoryLog[]> {
//     try {
//       await authenticator.requireAdmin(request);
//       if (!validateId(productId, EntityType.Product)) {
//         throw new Error("Invalid product ID format");
//       }
//       if (limit < 0 || skip < 0) {
//         throw new Error("Limit and skip must be non-negative");
//       }

//       const logs = await InventoryLogModel.find({ productId })
//         .sort({ timestamp: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean();

//       return logs.map((log) => ({
//         ...log,
//         inventoryId: log.inventoryId,
//         timestamp: log.timestamp.toISOString(),
//       }));
//     } catch (error) {
//       console.error("InventoryService.getStockHistory error:", error);
//       throw new Error("Failed to fetch stock history");
//     }
//   }

//   /**
//    * Get current stock for a product (user and admin accessible).
//    * @param productId - ID of the product.
//    * @returns Current stock and inStock status.
//    * @throws Error if product is not found.
//    */
//   static async getCurrentStock(productId: string): Promise<{
//     stock: number;
//     inStock: boolean;
//   }> {
//     try {
//       if (!validateId(productId, EntityType.Product)) {
//         throw new Error("Invalid product ID format");
//       }

//       const product = await ProductModel.findOne({ productId }).lean();
//       if (!product) {
//         throw new Error(`Product ${productId} not found`);
//       }

//       return {
//         stock: product.stock,
//         inStock: product.inStock,
//       };
//     } catch (error) {
//       console.error("InventoryService.getCurrentStock error:", error);
//       throw new Error("Failed to fetch current stock");
//     }
//   }
// }
