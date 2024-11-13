import { getUserByName } from "../model/user-model";

export const login = (name: string, password: string) => {
    let user = getUserByName(name)
    console.log(`Getting user data: ${user}`);
    

    if(!user) {
        console.log("Cannot find user");
        return {
            success: false,
            message: "Cannot find user!"
        }
    }

    if (user.password !== password) {
        console.log("User found but password not matched");
        return {
          success: false,
          message: "Password not matched!",
        };
    }

    console.log("Login success");
    return {
      success: true,
      message: `Welcome ${user.name}!`,
    }
}