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

export const getAllUsers = (): User[] => users

export const getUserByName = (name: string): User | undefined => users.find(user => user.name === name)



