/*
 * Single source of truth for dealership contact data.
 * Update the values here and every page (nav, footer, vehicle pages)
 * picks them up automatically. Contact happens by phone call only.
 */
export const site = {
  name: "Târg Auto Yanis",
  city: "Tulcea",
  phone: "0747 888 289",
  phoneHref: "tel:+40747888289",
  email: "dr.dream.marketing@gmail.com",
  address: "Str. Izvorului nr. 63, Tulcea",
  schedule: "Luni – Sâmbătă, 09:00 – 19:00",
  scheduleShort: "L–S, 09–19",
  tiktok: "https://www.tiktok.com/@targ.auto.yanis",
  facebook: "https://www.facebook.com/profile.php?id=61591624558792",
  mapsUrl: "https://maps.google.com/?q=Str.+Izvorului+63,+Tulcea,+Romania",
} as const;
