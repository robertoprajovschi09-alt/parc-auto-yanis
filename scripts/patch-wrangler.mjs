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

writeFileSync(path, JSON.stringify(cfg, null, 2));
console.log(`wrangler.json patched: name=${cfg.name}, routes=${cfg.routes.length}`);
