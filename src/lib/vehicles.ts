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
  /* Sold cars stay listed as social proof, clearly marked. `soldNote` is the
     short brag line shown on the badge, e.g. "în sub 24 de ore". */
  sold?: boolean;
  soldNote?: string;
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
    slug: "skoda-octavia-rs-2008",
    brand: "Škoda",
    model: "Octavia RS",
    year: 2008,
    mileage: 328328,
    fuel: "Diesel",
    transmission: "Manuală",
    engine: "2.0 L",
    power: "170 CP",
    price: 3900,
    location: "Tulcea",
    body: "Break",
    color: "Roșu",
    image: hero("skoda-octavia-rs-2008"),
    photos: gallery("skoda-octavia-rs-2008", 11, "Škoda Octavia RS 2008"),
    description: [
      "Škoda Octavia RS break din 2008, motor 2.0 diesel de 170 CP din fabrică, cu software modificat la 205 CP. Interior RS cu tapițerie Alcantara, jante RS și evacuare dublă.",
      "Preț negociabil, se acceptă și variante. Sună-ne pentru detalii.",
    ],
    features: {
      Confort: ["Navigație", "Senzori de parcare", "Geamuri electrice", "Scaune sport RS"],
      Exterior: ["Jante de aliaj RS", "Evacuare dublă", "Bare longitudinale plafon"],
    },
  },
  {
    slug: "dacia-duster-4x4-2011",
    brand: "Dacia",
    model: "Duster 4x4",
    year: 2011,
    mileage: 203096,
    fuel: "Benzină",
    transmission: "Manuală, 6 trepte",
    engine: "1.6 L",
    power: "105 CP",
    price: 5700,
    location: "Tulcea",
    body: "SUV",
    color: "Gri",
    image: hero("dacia-duster-4x4-2011"),
    photos: gallery("dacia-duster-4x4-2011", 11, "Dacia Duster 4x4 2011"),
    description: [
      "Dacia Duster 4x4 din 2011, motor 1.6 benzină de 105 CP, cutie manuală în 6 trepte. Tracțiune integrală, praguri laterale și bare de plafon.",
      "Preț negociabil, se acceptă și variante.",
    ],
    features: {
      Confort: ["Aer condiționat", "Geamuri electrice"],
      Acte: ["Acte la zi", "Fiscal"],
    },
  },
  {
    slug: "vw-golf-6-2011",
    brand: "Volkswagen",
    model: "Golf 6",
    year: 2011,
    mileage: 232981,
    fuel: "Diesel",
    transmission: "Manuală",
    engine: "1.6 L",
    price: 5150,
    location: "Tulcea",
    body: "Hatchback",
    color: "Albastru",
    image: hero("vw-golf-6-2011"),
    photos: gallery("vw-golf-6-2011", 11, "Volkswagen Golf 6 2011, albastru"),
    description: [
      "Volkswagen Golf 6 din 2011, motor 1.6 TDI, cutie manuală. Echipat cu navigație, pilot automat și senzori de parcare.",
      "Preț negociabil, se acceptă și variante.",
    ],
    features: {
      Confort: ["Navigație", "Pilot automat", "Senzori de parcare", "Climatronic"],
      Exterior: ["Proiectoare de ceață", "Jante de aliaj"],
      Acte: ["Acte la zi", "Fiscal"],
    },
  },
  {
    slug: "vw-golf-6-2010",
    brand: "Volkswagen",
    model: "Golf 6",
    year: 2010,
    mileage: 236008,
    fuel: "Diesel",
    transmission: "Manuală",
    engine: "1.6 L",
    price: 4900,
    location: "Tulcea",
    body: "Hatchback",
    color: "Negru",
    image: hero("vw-golf-6-2010"),
    photos: gallery("vw-golf-6-2010", 11, "Volkswagen Golf 6 2010, negru"),
    description: [
      "Volkswagen Golf 6 din 2010, motor 1.6 TDI, cutie manuală. Dublu climatronic și proiectoare de ceață.",
      "Preț negociabil.",
    ],
    features: {
      Confort: ["Dublu climatronic", "Geamuri electrice"],
      Siguranță: ["Airbag-uri", "ABS"],
      Exterior: ["Proiectoare de ceață"],
      Acte: ["Acte la zi", "Fiscal"],
    },
  },
  {
    slug: "audi-a4-b7-2008",
    brand: "Audi",
    model: "A4 Avant",
    year: 2008,
    mileage: 197948,
    fuel: "Diesel",
    transmission: "Automată",
    engine: "2.0 L",
    power: "140 CP",
    price: 3700,
    location: "Tulcea",
    body: "Break",
    color: "Negru",
    image: hero("audi-a4-b7-2008"),
    photos: gallery("audi-a4-b7-2008", 11, "Audi A4 Avant 2008"),
    description: [
      "Audi A4 Avant (B7) din 2008, motor 2.0 diesel de 140 CP, cutie automată. Un singur proprietar în România.",
      "Preț negociabil, se acceptă și variante.",
    ],
    features: {
      Confort: ["Dublu climatronic", "Scaune încălzite", "Geamuri electrice"],
      Exterior: ["Faruri xenon", "Proiectoare de ceață"],
      Acte: ["Acte la zi", "Fiscal"],
    },
  },
  {
    slug: "skoda-octavia-2011",
    brand: "Škoda",
    model: "Octavia",
    year: 2011,
    mileage: 208000,
    fuel: "Benzină",
    transmission: "Manuală",
    engine: "1.2 L",
    power: "105 CP",
    price: 3950,
    location: "Tulcea",
    body: "Break",
    image: hero("skoda-octavia-2011"),
    photos: gallery("skoda-octavia-2011", 11, "Škoda Octavia Combi 2011"),
    description: [
      "Škoda Octavia break din 2011, motor 1.2 benzină de 105 CP. Navigație Amundsen, climatronic pe două zone și faruri xenon.",
      "Se acceptă și variante. Sună-ne pentru detalii.",
    ],
    features: {
      Confort: ["Navigație Amundsen", "Climatronic pe două zone", "Geamuri electrice"],
      Exterior: ["Faruri xenon", "Proiectoare de ceață", "Bare longitudinale plafon"],
      Acte: ["Acte la zi", "Fiscal"],
    },
  },
  {
    slug: "opel-corsa-2011",
    brand: "Opel",
    model: "Corsa",
    year: 2011,
    mileage: 192520,
    fuel: "Benzină",
    transmission: "Manuală",
    engine: "1.2 L",
    location: "Tulcea",
    body: "Hatchback",
    image: hero("opel-corsa-2011"),
    photos: gallery("opel-corsa-2011", 11, "Opel Corsa 2011"),
    description: [
      "Opel Corsa din 2011, motor 1.2 benzină, cutie manuală. Mașină mică de oraș, economică și ușor de parcat.",
      "Preț la cerere — sună-ne pentru cea mai bună ofertă.",
    ],
  },
  {
    slug: "vw-touran-maro",
    brand: "Volkswagen",
    model: "Touran",
    mileage: 230760,
    fuel: "Diesel",
    engine: "1.6 L",
    power: "105 CP",
    location: "Tulcea",
    body: "Monovolum",
    color: "Maro",
    image: hero("vw-touran-maro"),
    photos: gallery("vw-touran-maro", 11, "Volkswagen Touran maro"),
    description: [
      "Volkswagen Touran maro, motor 1.6 diesel de 105 CP. Monovolum spațios, ideal pentru familie.",
      "Preț la cerere — sună-ne pentru detalii și ofertă.",
    ],
  },
  {
    slug: "kia-ceed-2008",
    brand: "Kia",
    model: "Ceed",
    year: 2008,
    mileage: 187450,
    fuel: "Benzină",
    engine: "1.4 L",
    price: 1750,
    location: "Tulcea",
    tag: "💣 Bomba zilei",
    image: hero("kia-ceed-2008"),
    photos: gallery("kia-ceed-2008", 7, "Kia Ceed 2008"),
    description: [
      "Kia Ceed din 2008, motor 1.4 benzină, 187.450 km. La 1.750 €, negociabil, este una dintre cele mai accesibile mașini din stoc.",
    ],
  },
  {
    slug: "citroen-c3-2005",
    brand: "Citroën",
    model: "C3",
    year: 2005,
    fuel: "Diesel",
    engine: "1.4 L",
    location: "Tulcea",
    tag: "💣 Bomba zilei",
    image: hero("citroen-c3-2005"),
    photos: gallery("citroen-c3-2005", 10, "Citroën C3 2005"),
    description: [
      "Citroën C3 din 2005, motor 1.4 diesel. Mașină mică de oraș, ușor de parcat și economică. Preț negociabil — sună-ne pentru cea mai bună ofertă.",
    ],
  },
  {
    slug: "opel-astra-j-2012",
    brand: "Opel",
    model: "Astra J",
    year: 2012,
    mileage: 234430,
    fuel: "Diesel",
    engine: "1.7 L",
    price: 3500,
    location: "Tulcea",
    image: hero("opel-astra-j-2012"),
    photos: gallery("opel-astra-j-2012", 17, "Opel Astra J 2012"),
    description: ["Opel Astra J din 2012, motor 1.7 diesel, 234.430 km."],
  },
  {
    slug: "audi-a4-s-line",
    brand: "Audi",
    model: "A4 S-line",
    location: "Tulcea",
    body: "Sedan",
    tag: "Detalii în curând",
    image: hero("audi-a4-s-line"),
    photos: gallery("audi-a4-s-line", 13, "Audi A4 S-line"),
    description: [
      "Audi A4 în pachet S-line, negru, cu jante negre și postură sportivă — una dintre cele mai arătoase mașini din curte.",
      "Detaliile complete (an, kilometraj, motorizare și preț) vin în curând. Sună-ne și îți spunem pe loc tot ce vrei să știi.",
    ],
  },
  {
    slug: "chevrolet-orlando",
    brand: "Chevrolet",
    model: "Orlando",
    location: "Tulcea",
    body: "Monovolum, 7 locuri",
    tag: "Detalii în curând",
    image: hero("chevrolet-orlando"),
    photos: gallery("chevrolet-orlando", 12, "Chevrolet Orlando"),
    description: [
      "Chevrolet Orlando — monovolum cu 7 locuri, spațios și practic pentru familie: loc generos pentru pasageri și bagaje.",
      "Detaliile complete vin în curând. Sună-ne și îți spunem pe loc tot ce vrei să știi.",
    ],
  },
  {
    slug: "dacia-logan",
    brand: "Dacia",
    model: "Logan",
    location: "Tulcea",
    body: "Sedan",
    color: "Alb",
    tag: "Detalii în curând",
    image: hero("dacia-logan"),
    photos: gallery("dacia-logan", 10, "Dacia Logan"),
    description: [
      "Dacia Logan albă, generație recentă — mașina simplă și de încredere: întreținere ieftină, piese oriunde, consum mic.",
      "Detaliile complete vin în curând. Sună-ne și îți spunem pe loc tot ce vrei să știi.",
    ],
  },
  {
    slug: "vw-golf-5-plus-2006",
    brand: "Volkswagen",
    model: "Golf 5 Plus",
    year: 2006,
    fuel: "Diesel",
    engine: "2.0 L",
    price: 2200,
    location: "Tulcea",
    image: hero("vw-golf-5-plus-2006"),
    photos: gallery("vw-golf-5-plus-2006", 11, "Volkswagen Golf 5 Plus 2006"),
    description: [
      "Volkswagen Golf 5 Plus din 2006, motor 2.0 diesel. Poziție de condus mai înaltă și interior spațios.",
    ],
  },
  {
    slug: "vw-touran-2005",
    brand: "Volkswagen",
    model: "Touran",
    year: 2005,
    mileage: 241646,
    fuel: "Diesel",
    engine: "2.0 L",
    price: 2500,
    location: "Tulcea",
    body: "Monovolum",
    image: hero("vw-touran-2005"),
    photos: gallery("vw-touran-2005", 8, "Volkswagen Touran 2005"),
    description: ["Volkswagen Touran din 2005, motor 2.0 diesel, 241.646 km. Preț negociabil."],
  },
  {
    slug: "mercedes-sprinter-duba",
    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2021,
    mileage: 135000,
    fuel: "Diesel",
    transmission: "Automată",
    engine: "2.0 L",
    location: "Tulcea",
    body: "Dubă cu cutie de marfă",
    image: hero("mercedes-sprinter-duba"),
    photos: gallery("mercedes-sprinter-duba", 17, "Mercedes-Benz Sprinter, dubă de marfă"),
    description: [
      "Mercedes-Benz Sprinter din noiembrie 2021 — dubă de marfă cu cutie Sommer, uși duble spate și treaptă de acces. Motor 2.0 diesel cu cutie automată, aproximativ 135.000 km.",
      "Ideală pentru curierat sau transport de marfă. Recent adusă din Germania. Preț la cerere — sună-ne pentru detalii și ofertă.",
    ],
  },
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
    sold: true,
    soldNote: "în sub 24 de ore",
    description: [
      "Volkswagen Tiguan din 2009, motor 2.0 diesel, cutie automată. S-a vândut în mai puțin de 24 de ore de la listare.",
      "Cauți ceva asemănător? Sună-ne — îți spunem imediat ce mai avem sau ce urmează să intre în stoc.",
    ],
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
export const bombaZileiSlug = "kia-ceed-2008";

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
