interface User {
  name: string;
  password: string;
}

const users: User[] = [
    {
        name: "Farras",
        password: "ganteng"
    },
    {
        name: "Reza",
        password: "ganteng"
    },
    {
        name: "Andhika",
        password: "ganteng"
    },
]

export const getAllUsers = () => {
    return users
}

export const getUserByName = (name: string) => {
  return users.find(u => u.name === name)
}



