import { z } from "zod"

const loginValidation = z.object({
    email: z.string().email("Mohon masukkan format email yang valid!"),
    password: z.string().min(6, "Panjang password minimal 6 huruf!")
})

export default loginValidation