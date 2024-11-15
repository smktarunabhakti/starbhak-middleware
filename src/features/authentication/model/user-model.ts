interface User {
    id: number;
    name: string;
    password: string;
  }
  
  const users: User[] = [
      {
        id: 1,
        name: "Farras",
        password: "ganteng"
      },
      {
        id: 2,
        name: "Reza",
        password: "ganteng"
      },
      {
        id: 3,
        name: "Andhika",
        password: "ganteng"
      },
  ]
  
export const getAllUsers = () => {
    return users
}

export const getById = (id: number) => {
  return users.find(
    u => u.id
)

}