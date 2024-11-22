import { z } from "zod"

const registerValidation = z.object({
    email: z.string().email("Mohon masukkan format email yang valid!"),
    password: z.string().min(6, "Panjang password minimal 6 huruf!"),
    name: z.string().min(1, "Masukkan nama")
})

export default registerValidation