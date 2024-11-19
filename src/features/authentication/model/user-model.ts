interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Farras",
        email: "xiomibrian1@gmail.com",
        password: "ganteng"
    },
    {
        id: 2,
        name: "Reza",
        email: "farras@gmail.com",
        password: "ganteng"
    },
    {
        id: 3,
        name: "Andhika",
        email: "suki@gmail.com",
        password: "ganteng"
    },
]

export const getAllUsers = (): User[] => users

export const getUserByName = (name: string): User | undefined => users.find(user => user.name === name)
export const getUserByEmail = (email: string): User | undefined => users.find(user => user.email === email)