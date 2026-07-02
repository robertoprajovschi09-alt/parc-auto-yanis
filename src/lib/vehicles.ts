import bmw from "@/assets/car-bmw.jpg";
import audi from "@/assets/car-audi.jpg";
import vw from "@/assets/car-vw.jpg";
import skoda from "@/assets/car-skoda.jpg";
import mercedesHero from "@/assets/mercedes/470211463.jpg.asset.json";
import { mercedesPhotos, mercedesFeatures } from "@/lib/mercedes";

export type VehiclePhoto = { src: string; alt: string };

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  power: string;
  price: number;
  image: string;
  location: string;
  tag?: string;
  /* Optional detail data — the vehicle page only renders what exists.
     No placeholders, no "—" rows, no invented equipment. */
  engine?: string;
  body?: string;
  color?: string;
  drive?: string;
  photos?: VehiclePhoto[];
  features?: Record<string, string[]>;
  description?: string[];
};

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-cla-180-2016",
    brand: "Mercedes-Benz",
    model: "CLA 180",
    year: 2016,
    mileage: 144789,
    fuel: "Benzină",
    transmission: "Automată",
    power: "122 CP",
    price: 16500,
    image: mercedesHero.url,
    location: "Tulcea",
    tag: "Recent adăugat",
    engine: "1.6 Turbo",
    body: "Sedan",
    color: "Negru Cosmos",
    drive: "Tracțiune față",
    photos: mercedesPhotos,
    features: mercedesFeatures,
    description: [
      "Mercedes-Benz CLA 180 din 2016, benzină, cutie automată. Mașina a fost verificată tehnic de echipa noastră, iar kilometrajul este garantat — la vânzare primești raportul complet de istoric.",
      "Interior în stare foarte bună, cu Apple CarPlay, navigație, lumini ambientale, scaune încălzite și climatizare automată pe două zone. Dotările complete sunt listate mai jos.",
      "Poți vedea mașina la sediul nostru din Tulcea, de luni până sâmbătă. Te ajutăm și cu finanțarea — răspuns de la bancă în aproximativ 48 de ore.",
    ],
  },
  {
    slug: "bmw-320d-2018",
    brand: "BMW",
    model: "320d xDrive",
    year: 2018,
    mileage: 118400,
    fuel: "Diesel",
    transmission: "Automată",
    power: "190 CP",
    price: 19900,
    image: bmw,
    location: "Tulcea",
  },
  {
    slug: "audi-a5-2017",
    brand: "Audi",
    model: "A5 Sportback",
    year: 2017,
    mileage: 132500,
    fuel: "Benzină",
    transmission: "Automată",
    power: "190 CP",
    price: 21500,
    image: audi,
    location: "Tulcea",
  },
  {
    slug: "vw-arteon-2019",
    brand: "Volkswagen",
    model: "Arteon R-Line",
    year: 2019,
    mileage: 96200,
    fuel: "Diesel",
    transmission: "Automată",
    power: "240 CP",
    price: 24800,
    image: vw,
    location: "Tulcea",
  },
  {
    slug: "skoda-superb-2020",
    brand: "Škoda",
    model: "Superb L&K",
    year: 2020,
    mileage: 78400,
    fuel: "Diesel",
    transmission: "Automată",
    power: "200 CP",
    price: 22900,
    image: skoda,
    location: "Tulcea",
  },
  {
    slug: "audi-a5-white-2018",
    brand: "Audi",
    model: "A5 Coupe",
    year: 2018,
    mileage: 89500,
    fuel: "Benzină",
    transmission: "Automată",
    power: "252 CP",
    price: 26400,
    image: audi,
    location: "Tulcea",
  },
  {
    slug: "bmw-320d-touring-2019",
    brand: "BMW",
    model: "320d Touring",
    year: 2019,
    mileage: 104200,
    fuel: "Diesel",
    transmission: "Manuală",
    power: "184 CP",
    price: 20500,
    image: bmw,
    location: "Tulcea",
  },
  {
    slug: "vw-arteon-shooting-2021",
    brand: "Volkswagen",
    model: "Arteon Shooting Brake",
    year: 2021,
    mileage: 62100,
    fuel: "Diesel",
    transmission: "Automată",
    power: "200 CP",
    price: 29900,
    image: vw,
    location: "Tulcea",
  },
  {
    slug: "skoda-superb-scout-2019",
    brand: "Škoda",
    model: "Superb Scout",
    year: 2019,
    mileage: 112000,
    fuel: "Diesel",
    transmission: "Automată",
    power: "190 CP",
    price: 19500,
    image: skoda,
    location: "Tulcea",
  },
];

export const featuredSlugs = [
  "mercedes-cla-180-2016",
  "bmw-320d-2018",
  "audi-a5-2017",
  "vw-arteon-2019",
];

export function formatKm(n: number) {
  return n.toLocaleString("ro-RO") + " km";
}

export function formatPrice(n: number) {
  return n.toLocaleString("ro-RO") + " €";
}
