import mongoose from "mongoose";
import { ContactDetailsModel } from "../models/contact-details.model";
import { generateId, EntityType } from "../lib/utils";
import type { ContactDetails } from "../models/contact-details.model";

// User-facing functions
export class ContactDetailsService {
  /**
   * Get contact details (user and admin accessible).
   */
  static async getContactDetails(): Promise<ContactDetails | null> {
    try {
      console.log("MongoDB Connection State:", mongoose.connection.readyState);
      const contactDetails = await ContactDetailsModel.findOne().lean();
      if (!contactDetails) {
        console.log("No contact details found in collection");
        return null;
      }
      return {
        ...contactDetails,
        contactId: contactDetails.contactId,
        createdAt: contactDetails.createdAt.toISOString(),
        updatedAt: contactDetails.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("ContactDetailsService.getContactDetails error:", error);
      throw new Error("Failed to fetch contact details");
    }
  }

  /**
   * Create or update contact details (no auth).
   */
  static async upsertContactDetails(
    contactData: Omit<ContactDetails, "contactId" | "createdAt" | "updatedAt">
  ): Promise<ContactDetails> {
    try {
      if (!contactData.address || !contactData.phone || !contactData.email) {
        throw new Error("Address, phone, and email are required");
      }

      const contactId = generateId(EntityType.Cnt);
      const contactDetails = await ContactDetailsModel.findOneAndUpdate(
        {},
        {
          ...contactData,
          contactId,
          updatedAt: new Date(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return {
        ...contactDetails,
        contactId: contactDetails.contactId,
        createdAt: contactDetails.createdAt.toISOString(),
        updatedAt: contactDetails.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("ContactDetailsService.upsertContactDetails error:", error);
      throw new Error("Failed to create or update contact details");
    }
  }

  /**
   * Update contact details (no auth).
   */
  static async updateContactDetails(
    contactId: string,
    updateData: Partial<ContactDetails>
  ): Promise<ContactDetails | null> {
    try {
      if (!contactId) {
        throw new Error("Contact ID is required");
      }

      const contactDetails = await ContactDetailsModel.findOneAndUpdate(
        { contactId },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).lean();

      if (!contactDetails) {
        throw new Error(`Contact details with ID ${contactId} not found`);
      }

      return {
        ...contactDetails,
        contactId: contactDetails.contactId,
        createdAt: contactDetails.createdAt.toISOString(),
        updatedAt: contactDetails.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("ContactDetailsService.updateContactDetails error:", error);
      throw new Error("Failed to update contact details");
    }
  }

  /**
   * Delete contact details (no auth).
   */
  static async deleteContactDetails(contactId: string): Promise<void> {
    try {
      if (!contactId) {
        throw new Error("Contact ID is required");
      }

      const contactDetails = await ContactDetailsModel.findOneAndDelete({
        contactId,
      });
      if (!contactDetails) {
        throw new Error(`Contact details with ID ${contactId} not found`);
      }
    } catch (error) {
      console.error("ContactDetailsService.deleteContactDetails error:", error);
      throw new Error("Failed to delete contact details");
    }
  }
}
