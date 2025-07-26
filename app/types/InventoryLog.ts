export type InventoryChangeType = "restock" | "purchase" | "manual";

export interface InventoryLog {
  inventoryId: string;
  productId: string;
  change: number;
  type: InventoryChangeType;
  note?: string;
  timestamp: Date;
  adminId?: string;
}
