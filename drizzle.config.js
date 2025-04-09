import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
     url:'ostgresql://neondb_owner:npg_4hDtIouN0ZaU@ep-winter-river-a5qedqpd-pooler.us-east-2.aws.neon.tech/aimock?sslmode=require',
  }
});
