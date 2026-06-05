import { ConvexHttpClient } from "convex/browser";
import fs from "fs";

const url = "https://zany-goose-393.eu-west-1.convex.cloud";
if (!url) throw new Error("No URL");

const client = new ConvexHttpClient(url);
const content = JSON.parse(fs.readFileSync("./data/content.json", "utf-8"));

async function main() {
  console.log("Seeding plans...");
  await client.mutation("plans:seedPlans", { plans: content.plans });
  console.log("Done!");
}

main().catch(console.error);
