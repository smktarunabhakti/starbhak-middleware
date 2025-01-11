import { sql } from "drizzle-orm";
import { db } from "..";
import type { Permission } from "../../common/interfaces/permission-interface";
import { permissions } from "../schemas/permissions-table-schema";
import { createPermission } from "../../common/model/permission-model";

const permissionSeeds: Permission[] = [
    {
        name: "liat-daftar-kejuruan",
        description: ""
    }
];

const seedPermissions = async () => {
    await db.execute(sql`TRUNCATE TABLE permissions RESTART IDENTITY CASCADE`);
    console.log("🗑️ Truncated the permissions table and reset identity\n");

    await db.delete(permissions);
    console.log("🗑️ Emptying the permissions table before seeding\n");

    for (const permissionSeed of permissionSeeds) {
        try {
            console.log(`➕ Inserting permission: ${permissionSeed.name}\n`);
            await createPermission(
                permissionSeed.name!,
                permissionSeed.description!
            );
        } catch (error) {
            console.error(`❌ Error inserting permission ${permissionSeed.name}:`, error, "\n");
        }
    }

    const allPermissions = await db.select().from(permissions);
    console.log("✅ Done\n\nAll permissions in the database:", allPermissions);
};

seedPermissions();
