import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

// UI utility (shadcn-style)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum EntityType {
  Product = "PROD",
  Order = "ORD",
  Transaction = "TXN",
  User = "USR",
  Admin = "ADM",
  Guest = "GST",
  Cart = "CART",
  Cnt = "CNT",
}

export function generateId(entityType: EntityType): string {
  const uuid = uuidv4().slice(0, 16);
  return `${entityType}-${uuid}`;
}

export function generateIds(entityType: EntityType, count: number): string[] {
  return Array.from({ length: count }, () => generateId(entityType));
}

export function validateId(id: string, entityType: EntityType): boolean {
  const regex = new RegExp(`^${entityType}-[0-9a-f]{8}`);
  return regex.test(id);
}

export async function checkIdUniqueness(
  id: string,
  model: any,
  field: string = "_id"
): Promise<boolean> {
  const existing = await model.findOne({ [field]: id }).lean();
  return !existing;
}
