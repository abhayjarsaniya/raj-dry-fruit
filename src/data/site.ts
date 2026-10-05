export const BRAND = "Raj Dryfruits";
export const BRAND_FULL = "Raj Dryfruits & Mukhwas";
export const STORE_NAME = "Raj Dryfruits & Mukhwas";

export const STORE_ADDRESS = {
  line1: "Radha Apartments, Shop No. 4",
  line2: "100 Feet Anand Nagar Road, Beside Natraj Medical",
  area: "Jodhpur Village",
  city: "Ahmedabad",
  state: "Gujarat",
  pincode: "380015",
  full: "Radha Apartments, Shop No. 4, 100 Feet Anand Nagar Road, beside Natraj Medical, Jodhpur Village, Ahmedabad, Gujarat 380015",
};

export const STORE_RATING = "4.6 ★";

export const WHATSAPP_DISPLAY = "+91 9712698899";
export const WHATSAPP_E164 = "919712698899";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Raj+Dryfruits+%26+Mukhwas,+Radha+Apartments,+Shop+No.+4,+100+Feet+Anand+Nagar+Road,+beside+Natraj+Medical,+Jodhpur+Village,+Ahmedabad,+Gujarat+380015";

export const MAX_QTY_PER_PRODUCT = 10;
export const MAX_QTY_MESSAGE = "Maximum quantity reached (10 per product).";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
