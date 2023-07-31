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

export const removeUser = (id: User['id']) => {
    const i = users.findIndex(user => user.id === id)

    if (i !== -1) {
        return users.splice(i, 1)[0]
    }
}

export const getRoomUsers = (room: User['room']) => {
    return users.filter(user => user.room === room)
}
