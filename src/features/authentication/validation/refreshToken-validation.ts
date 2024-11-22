import { z } from "zod";

const tokenValidation = z.object({
  id: z.string(),
  exp: z.number(),
});

export default tokenValidation
