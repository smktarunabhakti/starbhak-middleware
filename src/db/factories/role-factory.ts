import { db } from "..";
import type { Role } from "../../common/interfaces/role-interface";
import { createRole } from "../../common/model/role-model";
import { roles } from "../migrations/roles-table-schema";

const roleSeeds: Role[] = [
  {
    name: "Admin",
    description: "Having access to almost all function",
    domain: "",
  },
  {
    name: "Teacher",
    description: "Having access to teacher functions",
    domain: "",
  },
  {
    name: "Student",
    description: "Having access to student functions",
    domain: "",
  },
];

const seedRoles = async () => {
    await db.delete(roles)
    console.log("🗑️  Emptying the roles table before seeding\n");

    for (const roleSeed of roleSeeds) {
        try {
          console.log(`➕ Inserting role: ${roleSeed.name}`);
          await createRole(
            roleSeed.name,
            roleSeed.description,
            roleSeed.domain
          );
        } catch (error) {
          console.log(`❌ Error inserting role ${roleSeed.name}: `, error);
        }
    }

    const allRoles = await db.select().from(roles)
    console.log("\n✅ All roles in the database: ", allRoles);
}

seedRoles()