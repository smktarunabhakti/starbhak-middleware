import { sql } from "drizzle-orm";
import { db } from "..";
import { roles } from "../schemas/roles-table-schema";
import type { rolePermission } from "../../common/interfaces/rolePermission-interface";
import { rolePermissions } from "../schemas/permissions-table-schema";
import { createRolePermission } from "../../common/model/role-permission-model";

const generateRolePermissionSeeds = async (): Promise<rolePermission[]> => {
    const roleIds = await Promise.all(
        Array.from({ length: 5 }, async () => {
            const result = await db.execute(
                sql`SELECT id FROM roles ORDER BY RANDOM() LIMIT 1`
            );
            return result.rows[0]?.id as string;
        })
    );

    const permissionIds = await Promise.all(
        Array.from({ length: 5 }, async () => {
            const result = await db.execute(
                sql`SELECT id FROM permissions ORDER BY RANDOM() LIMIT 1`
            );
            return result.rows[0]?.id as string;
        })
    );

    const rolePermissionData: rolePermission[] = [
        {
            roleId: roleIds[0],
            permissionId: permissionIds[0]
        }
    ]

    return rolePermissionData
}

const seedRolePermissions = async () => {
    await db.execute(sql`TRUNCATE TABLE rolePermissions RESTART IDENTITY CASCADE`);
    console.log("🗑️  Truncated the roles table and reset identity\n");

    await db.delete(rolePermissions);
    console.log("🗑️  Emptying the rolePermissions table before seeding\n");

    const rolePermissionSeeds = await generateRolePermissionSeeds()

    for (const rolePermission of rolePermissionSeeds) {
        try {
            console.log(`➕ Inserting rolePermission: ${rolePermission.roleId} + ${rolePermission.permissionId}\n`);
            await createRolePermission(rolePermission.roleId!, rolePermission.permissionId!);
        } catch (error) {
            console.error(`❌ Error inserting rolePermission ${rolePermission.roleId} + ${rolePermission.permissionId}:`, error, "\n");
        }
    }

    const allRolePermissions = await db.select().from(rolePermissions);
    console.log("✅ All rolePermissions in the database:", allRolePermissions);
};

seedRolePermissions();
