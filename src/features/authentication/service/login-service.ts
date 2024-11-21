import { use } from "hono/jsx";
import { getUserByEmail } from "../../../common/model/user-model";

interface loginResult {
  success: boolean,
  message: string
}

export const loginService = async (email: string, password: string): Promise<loginResult> => {
  const user = await getUserByEmail(email)

  if (!user) {
    return {
      success: false,
      message: "Tidak bisa menemukan pengguna dengan email " + email.toString(),
    } as loginResult;
  }

  if (user.passwordHash !== password) {
    return {
      success: false,
      message: "Password tidak sesuai dengan data yang ada",
    } as loginResult;
  }  

  return {
    success: true,
    message: "Berhasil login, halo " + user.name
  } as loginResult;
}