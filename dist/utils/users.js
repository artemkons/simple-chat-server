"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.addUser = void 0;
const users = [];
const addUser = (user) => {
    users.push(user);
};
exports.addUser = addUser;
const getUser = (id) => {
    return users.find(user => user.id === id);
};
exports.getUser = getUser;
// TODO del user
