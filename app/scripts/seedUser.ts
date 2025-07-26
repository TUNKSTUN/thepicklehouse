import mongoose from "mongoose";
import { UserModel } from "../models/user.model";
import { ProductModel } from "../models/product.model";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { initMongoDB } from "~/environments/environment";
import { User, Address, PurchaseHistory, Wishlist } from "../types/User";

async function seedUsers() {
  try {
    // Initialize MongoDB connection
    console.log("Connecting to MongoDB...");
    await initMongoDB();
    console.log("Connected to MongoDB");

    // Clear existing users
    console.log("Clearing existing users...");
    await UserModel.deleteMany({});
    console.log("Users collection cleared");

    // Fetch product IDs for purchase history and wishlist
    console.log("Fetching products...");
    const products = await ProductModel.find().lean();
    if (products.length === 0) {
      console.error(
        "No products found in database. Please seed products first."
      );
      process.exit(1);
    }
    const productIds = products.map((p) => p.productId);
    console.log(`Found ${productIds.length} products`);

    // Define sample users
    const users: Partial<User>[] = [
      // Admin User
      {
        userId: `admin-${uuidv4().slice(0, 8)}`,
        name: "Admin User",
        email: "admin@houseofpickles.com",
        passwordHash: await bcrypt.hash("admin123", 10),
        role: "admin",
        phone: "+91-9876543210",
        address: [
          {
            street: "123 Admin Street",
            city: "Hyderabad",
            state: "Telangana",
            postalCode: "500001",
            country: "India",
          } as Address,
        ],
        isActive: true,
        orderHistory: [],
        wishlist: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Customer 1
      {
        userId: `user-${uuidv4().slice(0, 8)}`,
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        passwordHash: await bcrypt.hash("password123", 10),
        role: "user",
        phone: "+91-9123456789",
        address: [
          {
            street: "456 Customer Lane",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001",
            country: "India",
          } as Address,
        ],
        isActive: true,
        orderHistory: [
          {
            productId: productIds[0],
            totalPaid: "299",
            purchasedDate: new Date("2025-06-15").toISOString(),
            purchaseStatus: "delivered",
            quantity: "2",
          } as PurchaseHistory,
          {
            productId: productIds[2] || productIds[0], // Fallback to first product if index 2 is unavailable
            totalPaid: "199",
            purchasedDate: new Date("2025-07-01").toISOString(),
            purchaseStatus: "delivered",
            quantity: "1",
          } as PurchaseHistory,
        ],
        wishlist: [
          {
            products: [productIds[1] || productIds[0]], // Fiery Red Chilli Pickle or fallback
          } as Wishlist,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Customer 2
      {
        userId: `user-${uuidv4().slice(0, 8)}`,
        name: "Rahul Verma",
        email: "rahul.verma@example.com",
        passwordHash: await bcrypt.hash("password123", 10),
        role: "user",
        phone: "+91-9234567890",
        address: [
          {
            street: "789 Spice Road",
            city: "Delhi",
            state: "Delhi",
            postalCode: "110001",
            country: "India",
          } as Address,
        ],
        isActive: true,
        orderHistory: [
          {
            productId: productIds[8] || productIds[0], // Chicken Pickle or fallback
            totalPaid: "399",
            purchasedDate: new Date("2025-07-10").toISOString(),
            purchaseStatus: "delivered",
            quantity: "1",
          } as PurchaseHistory,
        ],
        wishlist: [
          {
            products: [productIds[9] || productIds[0]], // Prawn Pickle or fallback
          } as Wishlist,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Customer 3
      {
        userId: `user-${uuidv4().slice(0, 8)}`,
        name: "Anita Reddy",
        email: "anita.reddy@example.com",
        passwordHash: await bcrypt.hash("password123", 10),
        role: "user",
        phone: "+91-9345678901",
        address: [
          {
            street: "101 Flavor Street",
            city: "Bangalore",
            state: "Karnataka",
            postalCode: "560001",
            country: "India",
          } as Address,
        ],
        isActive: true,
        orderHistory: [
          {
            productId: productIds[3] || productIds[0], // Lemon Pickle or fallback
            totalPaid: "179",
            purchasedDate: new Date("2025-07-20").toISOString(),
            purchaseStatus: "delivered",
            quantity: "3",
          } as PurchaseHistory,
        ],
        wishlist: [
          {
            products: [
              productIds[4] || productIds[0], // Garlic Pickle or fallback
              productIds[7] || productIds[0], // Ginger Pickle or fallback
            ],
          } as Wishlist,
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Validate productIds in orderHistory and wishlist
    console.log("Validating product IDs...");
    for (const user of users) {
      if (user.orderHistory) {
        user.orderHistory = user.orderHistory.filter((order) =>
          productIds.includes(order.productId)
        );
      }
      if (user.wishlist) {
        user.wishlist = user.wishlist.map((wl) => ({
          products: wl.products.filter((pid) => productIds.includes(pid)),
        }));
      }
    }

    // Insert users
    console.log("Inserting users...");
    await UserModel.insertMany(users);
    console.log(`Successfully seeded ${users.length} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  } finally {
    // Close MongoDB connection
    console.log("Closing MongoDB connection...");
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  }
}

seedUsers();
