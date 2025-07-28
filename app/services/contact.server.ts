import { ContactModel, Contact } from "../models/contact.model";
import { sendContactEmail } from "../lib/email.server";

export class ContactService {
  /**
   * Create a new contact submission and send email notification.
   * @param name - User's name.
   * @param email - User's email.
   * @param message - User's message.
   * @returns Created contact.
   */
  static async createContact(
    name: string,
    email: string,
    message: string
  ): Promise<Contact> {
    try {
      const contact = new ContactModel({
        name,
        email,
        message,
      });
      const savedContact = await contact.save();

      // Send email notification
      await sendContactEmail({
        to_email: "thehouseofhappiness@gmail.com",
        from_name: name,
        from_email: email,
        message,
      });

      return savedContact;
    } catch (error) {
      console.error("ContactService.createContact error:", error);
      throw new Error("Failed to create contact submission or send email");
    }
  }

  /**
   * Get all contact submissions.
   * @returns List of all contacts.
   */
  static async getAllContacts(): Promise<Contact[]> {
    try {
      return await ContactModel.find().lean();
    } catch (error) {
      console.error("ContactService.getAllContacts error:", error);
      throw new Error("Failed to fetch contacts");
    }
  }

  /**
   * Get a contact submission by ID.
   * @param contactId - The ID of the contact (_id).
   * @returns Contact if found, null otherwise.
   */
  static async getContactById(contactId: string): Promise<Contact | null> {
    try {
      return await ContactModel.findById(contactId).lean();
    } catch (error) {
      console.error("ContactService.getContactById error:", error);
      throw new Error("Failed to fetch contact");
    }
  }

  /**
   * Delete a contact submission.
   * @param contactId - The ID of the contact (_id).
   * @returns Deleted contact or null if not found.
   */
  static async deleteContact(contactId: string): Promise<Contact | null> {
    try {
      return await ContactModel.findByIdAndDelete(contactId).lean();
    } catch (error) {
      console.error("ContactService.deleteContact error:", error);
      throw new Error("Failed to delete contact");
    }
  }
}
