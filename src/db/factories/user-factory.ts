import { sql } from "drizzle-orm";
import { db } from "..";
import type { User } from "../../common/interfaces/user-interface";
import { createUser } from "../../common/model/user-model";
import { roles } from "../migrations/roles-table-schema";
import {  users } from "../schema";