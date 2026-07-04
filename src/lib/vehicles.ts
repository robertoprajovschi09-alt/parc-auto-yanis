export type VehiclePhoto = { src: string; alt: string };

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  /* Core facts. All optional except identity — we only ever show what is
     real for a given car (see docs/AUDIT.md: no invented specs, no "—" rows).
     A missing price renders as "Preț la cerere", not a made-up number. */
  year?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  engine?: string;
  power?: string;
  price?: number;
  location: string;
  image: string;
  tag?: string;
  body?: string;
  color?: string;
  drive?: string;
  photos?: VehiclePhoto[];
  features?: Record<string, string[]>;
  description?: string[];
};

/* Real inventory photos live in public/stoc/<slug>/ — hero.jpg (card) plus
   NN.jpg gallery images, optimised from the originals. */
function hero(slug: string) {
  return `/stoc/${slug}/hero.jpg`;
}
function gallery(slug: string, count: number, label: string): VehiclePhoto[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/stoc/${slug}/${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `${label} — fotografia ${i + 1}`,
  }));
}

export const vehicles: Vehicle[] = [
  {
    slug: "audi-a4-avant-2010",
    brand: "Audi",
    model: "A4 Avant",
    year: 2010,
    mileage: 265376,
    fuel: "Diesel",
    engine: "2.0 L",
    price: 6000,
    location: "Tulcea",
    body: "Break",
    image: hero("audi-a4-avant-2010"),
    photos: gallery("audi-a4-avant-2010", 16, "Audi A4 Avant 2010"),
    description: ["Audi A4 Avant din 2010, motor 2.0 diesel, caroserie break."],
  },
  {
    slug: "bmw-320d-2010",
    brand: "BMW",
    model: "320d",
    year: 2010,
    mileage: 331712,
    fuel: "Diesel",
    engine: "2.0 L",
    location: "Tulcea",
    body: "Sedan",
    image: hero("bmw-320d-2010"),
    photos: gallery("bmw-320d-2010", 15, "BMW 320d 2010"),
    description: ["BMW 320d din 2010, motor 2.0 diesel. Preț negociabil."],
  },
  {
    slug: "mercedes-ml320-2007",
    brand: "Mercedes-Benz",
    model: "ML 320 CDI",
    year: 2007,
    fuel: "Diesel",
    transmission: "Automată",
    engine: "3.0 L",
    power: "224 CP",
    location: "Tulcea",
    body: "SUV",
    image: hero("mercedes-ml320-2007"),
    photos: gallery("mercedes-ml320-2007", 16, "Mercedes-Benz ML 320 CDI 2007"),
    description: [
      "Mercedes-Benz ML 320 CDI din 2007, motor 3.0 diesel de 224 CP, cutie automată. Preț negociabil.",
    ],
  },
  {
    slug: "renault-kangoo-2010",
    brand: "Renault",
    model: "Kangoo",
    year: 2010,
    mileage: 284000,
    fuel: "Diesel",
    engine: "1.5 L",
    price: 4150,
    location: "Tulcea",
    body: "Furgon",
    image: hero("renault-kangoo-2010"),
    photos: gallery("renault-kangoo-2010", 13, "Renault Kangoo 2010"),
    description: ["Renault Kangoo din 2010, motor 1.5 diesel."],
  },
  {
    slug: "dacia-duster-2014",
    brand: "Dacia",
    model: "Duster",
    year: 2014,
    mileage: 148360,
    fuel: "Benzină",
    engine: "1.2 L",
    price: 5500,
    location: "Tulcea",
    body: "SUV",
    image: hero("dacia-duster-2014"),
    photos: gallery("dacia-duster-2014", 9, "Dacia Duster 2014"),
    description: ["Dacia Duster din 2014, motor 1.2 benzină, SUV compact."],
  },
  {
    slug: "vw-tiguan-2009",
    brand: "Volkswagen",
    model: "Tiguan",
    year: 2009,
    mileage: 257000,
    fuel: "Diesel",
    transmission: "Automată",
    engine: "2.0 L",
    location: "Tulcea",
    body: "SUV",
    image: hero("vw-tiguan-2009"),
    photos: gallery("vw-tiguan-2009", 16, "Volkswagen Tiguan 2009"),
    description: ["Volkswagen Tiguan din 2009, motor 2.0 diesel, cutie automată. Preț negociabil."],
  },
  {
    slug: "vw-passat-break-2011",
    brand: "Volkswagen",
    model: "Passat Variant",
    year: 2011,
    mileage: 305000,
    fuel: "Diesel",
    engine: "1.6 L",
    power: "105 CP",
    price: 5500,
    location: "Tulcea",
    body: "Break",
    image: hero("vw-passat-break-2011"),
    photos: gallery("vw-passat-break-2011", 13, "Volkswagen Passat Variant 2011"),
    description: [
      "Volkswagen Passat Variant din 2011, motor 1.6 TDI de 105 CP. Înmatriculat în România, se predă cu două chei.",
    ],
    features: {
      Confort: [
        "Dublu climatronic",
        "Încălzire în scaune",
        "Scaun șofer electric",
        "Pilot automat",
        "Faruri automate",
      ],
      Tehnologie: ["Navigație", "Bluetooth / AUX / USB", "Computer de bord", "Comenzi pe volan"],
      Siguranță: [
        "ABS / ESP / SRS",
        "Senzori de parcare",
        "Senzori de lumini",
        "Senzori de ploaie și presiune în roți",
      ],
      Exterior: ["Jante de aliaj R16", "Proiectoare de ceață", "Oglinzi rabatabile electric"],
    },
  },
  {
    slug: "vw-touran-2008",
    brand: "Volkswagen",
    model: "Touran",
    year: 2008,
    mileage: 269000,
    fuel: "Diesel",
    engine: "2.0 L",
    power: "170 CP",
    price: 4000,
    location: "Tulcea",
    body: "Monovolum",
    image: hero("vw-touran-2008"),
    photos: gallery("vw-touran-2008", 13, "Volkswagen Touran 2008"),
    description: [
      "Volkswagen Touran din 2008, motor 2.0 TDI de 170 CP, cutie în 6 trepte. Discuri și plăcuțe față-spate recent înlocuite.",
    ],
    features: {
      Confort: [
        "Dublu climatronic",
        "Senzori de parcare spate",
        "Pilot automat",
        "Volan reglabil",
        "Sertare de depozitare / torpedou refrigerat",
      ],
      Tehnologie: [
        "Radio / CD original",
        "Bluetooth / AUX",
        "Computer de bord",
        "Comenzi pe volan",
      ],
      Siguranță: ["ABS / ESP / SRS", "Senzori de ploaie și lumini", "Senzori de presiune în roți"],
      Exterior: ["Jante de aliaj R17", "Oglinzi electrice, heliomate și rabatabile electric"],
    },
  },
  {
    slug: "vw-sharan-2009",
    brand: "Volkswagen",
    model: "Sharan",
    year: 2009,
    mileage: 296667,
    fuel: "Diesel",
    engine: "2.0 L",
    price: 3500,
    location: "Tulcea",
    body: "Monovolum, 7 locuri",
    image: hero("vw-sharan-2009"),
    photos: gallery("vw-sharan-2009", 17, "Volkswagen Sharan 2009"),
    description: ["Volkswagen Sharan din 2009, motor 2.0 diesel, 7 locuri."],
  },
  {
    slug: "vw-jetta-2013",
    brand: "Volkswagen",
    model: "Jetta",
    year: 2013,
    fuel: "Diesel",
    engine: "1.6 L",
    price: 5150,
    location: "Tulcea",
    body: "Sedan",
    image: hero("vw-jetta-2013"),
    photos: gallery("vw-jetta-2013", 8, "Volkswagen Jetta 2013"),
    description: ["Volkswagen Jetta din 2013, motor 1.6 diesel, sedan."],
  },
  {
    slug: "vw-golf-6",
    brand: "Volkswagen",
    model: "Golf 6",
    location: "Tulcea",
    body: "Hatchback",
    tag: "Detalii în curând",
    image: hero("vw-golf-6"),
    photos: gallery("vw-golf-6", 15, "Volkswagen Golf 6"),
    description: ["Volkswagen Golf 6. Detalii complete în curând — sună-ne pentru informații."],
  },
];

/* Homepage „Bomba Zilei” — the one under-market deal to spotlight.
   Owner: change this slug to feature a different car. The section only
   renders when the chosen car exists and has a listed price. */
export const bombaZileiSlug = "vw-touran-2008";

export function formatKm(n: number) {
  return n.toLocaleString("ro-RO") + " km";
}

export function formatPrice(n: number) {
  return n.toLocaleString("ro-RO") + " €";
}

/** Price for display: a formatted number, or the honest fallback. */
export function priceLabel(v: Pick<Vehicle, "price">) {
  return v.price != null ? formatPrice(v.price) : "Preț la cerere";
}
