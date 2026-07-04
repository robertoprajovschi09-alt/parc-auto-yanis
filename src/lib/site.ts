/*
 * Single source of truth for dealership contact data.
 * Update the values here and every page (nav, footer, contact, vehicle
 * pages, WhatsApp links) picks them up automatically.
 */
export const site = {
  name: "Târg Auto Yanis",
  city: "Tulcea",
  phone: "0747 465 265",
  phoneHref: "tel:+40747465265",
  whatsappNumber: "40747465265",
  // TODO(owner): confirm email + social handles under the new brand
  email: "salut@targautoyanis.ro",
  address: "Str. Isaccei 12, Tulcea",
  schedule: "Luni – Sâmbătă, 09:00 – 19:00",
  scheduleShort: "L–S, 09–19",
  instagram: "https://www.instagram.com/targautoyanis",
  facebook: "https://www.facebook.com/targautoyanis",
  mapsUrl: "https://maps.google.com/?q=Str.+Isaccei+12,+Tulcea",
} as const;

/** WhatsApp deep link with a prefilled Romanian message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
