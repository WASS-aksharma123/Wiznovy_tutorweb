// User credential storage utility
const USERS_KEY = 'wiznovy_users';

export const userStorage = {
  // Get all registered users
  getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  // Check if email is already registered
  isEmailRegistered(email) {
    const users = this.getUsers();
    return users.some(user => user.email === email);
  },

  // Save new user credentials
  saveUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // In production, hash this
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  // Get user by email
  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }
};