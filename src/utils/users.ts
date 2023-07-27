interface User {
    id: string
    username: string
    room: string
}

const users: User[] = [];

export const addUser = (user: User) => {
    users.push(user);
}

export const getUser = (id: User['id']) => {
    return users.find(user => user.id === id)
}

// TODO del user
