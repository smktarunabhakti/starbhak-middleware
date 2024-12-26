import { sql } from "drizzle-orm";
import { db } from "..";
import type { Parent } from "../../common/interfaces/parent-interface";
import { parents } from "../schemas/parents-table-schema";
import { createParent } from "../../common/model/parent-model";

const ParentSeeds: Parent[] = [
    {
        username: "Sukaryo",
        email: "sukaryo@gmail.com",
        password: "sukaryo123"
    },
    {
        username: "timur",
        email: "timur@gmail.com",
        password: "timur123"
    },
    {
        username: "tabroni",
        email: "tabroni@gmail.com",
        password: "tabroni123"
    },
];

const seedParents = async () => {
    await db.execute(sql`TRUNCATE TABLE Parents RESTART IDENTITY CASCADE`);
    console.log("🗑️  Truncated the Parents table and reset identity\n");

    await db.delete(parents)
    console.log("🗑️  Emptying the Parents table before seeding\n");

    for (const ParentSeed of ParentSeeds) {
        try {
          console.log(`➕ Inserting Parent: ${ParentSeed.username}\n`);
          await createParent(
            {
                username: ParentSeed.username,
                email: ParentSeed.email,
                password: ParentSeed.password,
            }
          );
        } catch (error) {
          console.log(`❌ Error inserting Parent ${ParentSeed.username}: `, error, "\n");
        }
    }

    const allParents = await db.select().from(parents)
    console.log("✅ All Parents in the database: ", allParents);
}

seedParents()