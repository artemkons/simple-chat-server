"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.getUser = exports.addUser = void 0;
const users = [];
const addUser = (user) => {
    users.push(user);
};
exports.addUser = addUser;
const getUser = (id) => {
    return users.find(user => user.id === id);
};
exports.getUser = getUser;
const removeUser = (id) => {
    const i = users.findIndex(user => user.id === id);
    if (i !== -1) {
        return users.splice(i, 1)[0];
    }
};
exports.removeUser = removeUser;
