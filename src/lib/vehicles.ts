import bmw from "@/assets/car-bmw.jpg";
import audi from "@/assets/car-audi.jpg";
import vw from "@/assets/car-vw.jpg";
import skoda from "@/assets/car-skoda.jpg";
import mercedesHero from "@/assets/mercedes/470211463.jpg.asset.json";

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
  tag?: string;
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
    tag: "Recent adăugat",
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
    tag: "Rezervat curând",
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