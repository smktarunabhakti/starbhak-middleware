import { desc } from "drizzle-orm";
import { db } from "../../../db";
import { roles } from "../../../db/schemas/roles-table-schema";

const fetchAllRoles = async () => {
  try {
    const collection = await db
      .select()
      .from(roles)
      .orderBy(desc(roles.createdAt));

    return {
      success: true,
      message: "Success fetched all roles!",
      data: collection,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed while fetching roles data!",
      data: { errors: error },
    };
  }
}

export { fetchAllRoles };