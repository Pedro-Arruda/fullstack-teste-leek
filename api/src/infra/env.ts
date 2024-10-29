import packageJson from "@/../package.json";
import { config } from "dotenv";
import { z } from "zod";

config({ override: true });

const schema = z.object({
  API_NAME: z.string().default(packageJson.name),
  API_PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.flatten().fieldErrors);

  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
