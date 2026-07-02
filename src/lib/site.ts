/*
 * Single source of truth for dealership contact data.
 * Update the values here and every page (nav, footer, contact, vehicle
 * pages, WhatsApp links) picks them up automatically.
 */
export const site = {
  name: "Parc Auto Yanis",
  city: "Tulcea",
  // TODO(owner): replace placeholder phone with the real number
  phone: "+40 743 000 000",
  phoneHref: "tel:+40743000000",
  whatsappNumber: "40743000000",
  email: "salut@parcautoyanis.ro",
  address: "Str. Isaccei 12, Tulcea",
  schedule: "Luni – Sâmbătă, 09:00 – 19:00",
  scheduleShort: "L–S, 09–19",
  instagram: "https://www.instagram.com/parcautoyanis",
  facebook: "https://www.facebook.com/parcautoyanis",
  mapsUrl: "https://maps.google.com/?q=Str.+Isaccei+12,+Tulcea",
} as const;

/** WhatsApp deep link with a prefilled Romanian message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
