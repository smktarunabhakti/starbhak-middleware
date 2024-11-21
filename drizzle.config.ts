import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/migrations/**.ts",
    out: "./src/db/migrations",
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});
