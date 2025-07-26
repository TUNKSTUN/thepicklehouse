import mongoose from "mongoose";
import { ContactDetailsModel } from "../models/contact-details.model";
import { authenticator } from "../lib/security/session.server";
import { generateId, EntityType } from "../lib/utils";
import type { ContactDetails } from "../models/contact-details.model";
import type { Request } from "@remix-run/node";

// User-facing functions
export class ContactDetailsService {
  /**
   * Get contact details (user and admin accessible).
   * @returns Contact details or null if not found.
   * @throws Error if database query fails.
   */
  static async getContactDetails(): Promise<ContactDetails | null> {
    try {
      console.log("MongoDB Connection State:", mongoose.connection.readyState); // 1 = connected
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

  // Admin-facing functions
  /**
   * Create or update contact details (admin only, upsert).
   * @param request - Remix request object for authentication.
   * @param contactData - Contact details data excluding contactId, createdAt, updatedAt.
   * @returns Created or updated contact details.
   * @throws Error if authentication fails, required fields are missing, or upsert fails.
   */
  static async upsertContactDetails(
    request: Request,
    contactData: Omit<ContactDetails, "contactId" | "createdAt" | "updatedAt">
  ): Promise<ContactDetails> {
    try {
      await authenticator.isAuthenticated(request, {
        failureRedirect: "/_thop_.login?redirect=/admin/dashboard",
      });

      if (!contactData.address || !contactData.phone || !contactData.email) {
        throw new Error("Address, phone, and email are required");
      }

      const contactId = generateId(EntityType.ContactDetails);
      const contactDetails = await ContactDetailsModel.findOneAndUpdate(
        {}, // Match any document (single record assumption)
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
   * Update contact details (admin only).
   * @param request - Remix request object for authentication.
   * @param contactId - ID of the contact details.
   * @param updateData - Partial contact details data to update.
   * @returns Updated contact details or null if not found.
   * @throws Error if authentication fails, contactId is invalid, or update fails.
   */
  static async updateContactDetails(
    request: Request,
    contactId: string,
    updateData: Partial<ContactDetails>
  ): Promise<ContactDetails | null> {
    try {
      await authenticator.isAuthenticated(request, {
        failureRedirect: "/_thop_.login?redirect=/admin/dashboard",
      });

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
   * Delete contact details (admin only).
   * @param request - Remix request object for authentication.
   * @param contactId - ID of the contact details.
   * @throws Error if authentication fails, contactId is invalid, or deletion fails.
   */
  static async deleteContactDetails(
    request: Request,
    contactId: string
  ): Promise<void> {
    try {
      await authenticator.isAuthenticated(request, {
        failureRedirect: "/_thop_.login?redirect=/admin/dashboard",
      });

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
