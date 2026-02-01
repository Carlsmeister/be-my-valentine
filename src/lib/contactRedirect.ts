/**
 * Contact Method Redirect Utilities
 * Generates appropriate redirect URLs for different messaging platforms
 */

export type ContactMethod = "email" | "sms" | "whatsapp" | "snapchat" | "instagram" | "messenger";

const YES_MESSAGE = "YES! I'll be your Valentine! 💕";
const NO_MESSAGE = "Sorry, maybe next year 💔";

/**
 * Generates the appropriate redirect URL based on contact method and response
 * @param method - The contact method (email, sms, whatsapp, etc.)
 * @param contact - The contact info (email, phone, username)
 * @param isYes - Whether the user clicked "Yes"
 * @returns The redirect URL
 */
export function getRedirectUrl(
  method: ContactMethod,
  contact: string,
  isYes: boolean
): string {
  const message = isYes ? YES_MESSAGE : NO_MESSAGE;
  const encodedMessage = encodeURIComponent(message);

  switch (method) {
    case "email":
      // mailto: link with subject and body
      return `mailto:${contact}?subject=${encodeURIComponent("Valentine's Response 💕")}&body=${encodedMessage}`;

    case "sms":
      // SMS link (works on most mobile devices)
      // Using '?' for iOS and '&' for Android, but '?' works on both
      return `sms:${contact}?body=${encodedMessage}`;

    case "whatsapp":
      // WhatsApp link - removes any non-numeric characters from phone
      const whatsappPhone = contact.replace(/\D/g, "");
      return `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

    case "snapchat":
      // Snapchat profile link (user can then message)
      return `https://snapchat.com/add/${contact}`;

    case "instagram":
      // Instagram DM link
      return `https://instagram.com/${contact}`;

    case "messenger":
      // Facebook Messenger link
      return `https://m.me/${contact}`;

    default:
      // Fallback to WhatsApp if method unknown
      console.warn(`Unknown contact method: ${method}, falling back to WhatsApp`);
      return `https://wa.me/${contact}?text=${encodedMessage}`;
  }
}

/**
 * Parses URL parameters to extract Valentine configuration
 * @returns Configuration object or null if not a Valentine link
 */
export function parseValentineParams(): {
  fromName?: string;
  toName?: string;
  method: ContactMethod;
  contact: string;
} | null {
  const params = new URLSearchParams(window.location.search);
  
  const method = params.get("method") as ContactMethod;
  const contact = params.get("contact");

  // If no method or contact, this is not a Valentine link
  if (!method || !contact) {
    return null;
  }

  return {
    fromName: params.get("from") || undefined,
    toName: params.get("to") || undefined,
    method,
    contact,
  };
}
