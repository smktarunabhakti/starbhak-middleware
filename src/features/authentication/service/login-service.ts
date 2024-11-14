import { getUserByName } from "../model/user-model";

interface loginResult {
  success: boolean,
  message: string
}

export const login = (name: string, password: string): loginResult => {
  const user = getUserByName(name)

  if (!user) {
    return {
      success: false,
      message: "User not found"
    }
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid password"
    }
  }

  return {
    success: true,
    message: `Welcome ${user.name}`
  }
}