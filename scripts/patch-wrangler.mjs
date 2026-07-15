/*
 * Post-build patch for the generated Cloudflare config.
 * Nitro regenerates .output/server/wrangler.json on every build with an
 * auto-generated name and no routes; this script pins the worker name and
 * attaches the custom domains, so `bun run deploy` is repeatable.
 */
import { readFileSync, writeFileSync } from "node:fs";

const path = new URL("../.output/server/wrangler.json", import.meta.url);
const cfg = JSON.parse(readFileSync(path, "utf8"));

cfg.name = "targ-auto-yanis";
cfg.workers_dev = false;
cfg.routes = [
  { pattern: "targautoyanis.ro", custom_domain: true },
  { pattern: "www.targautoyanis.ro", custom_domain: true },
];

/* Pin the compatibility date. Nitro stamps it from the machine's LOCAL date,
   which in a UTC+n timezone can already be "tomorrow" — Cloudflare validates
   against UTC and rejects a future date (error 10021). A pinned date is also
   what compatibility dates are for: stable runtime behaviour across deploys. */
cfg.compatibility_date = "2026-07-04";

writeFileSync(path, JSON.stringify(cfg, null, 2));
console.log(
  `wrangler.json patched: name=${cfg.name}, routes=${cfg.routes.length}, compat=${cfg.compatibility_date}`,
);
