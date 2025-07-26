import mongoose, { Schema, Document } from "mongoose";

export interface ContactDetails extends Document {
  _id: string;
  address: string;
  phone: string;
  email: string;
  instagram?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactDetailsSchema: Schema = new Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: [200, "Address cannot exceed 200 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?\d{10,15}$/, "Please provide a valid phone number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    instagram: {
      type: String,
      trim: true,
      maxlength: [50, "Instagram handle cannot exceed 50 characters"],
    },
  },
  { timestamps: true }
);

// Prevent model redefinition
export const ContactDetailsModel =
  mongoose.models.ContactDetails ||
  mongoose.model<ContactDetails>("ContactDetails", ContactDetailsSchema);
