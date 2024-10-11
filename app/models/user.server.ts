// Simulating a database for demonstration purposes
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
];

export async function loginUser(email: string, password: string) {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { error: 'Invalid credentials' };
  }

  return { message: 'Login successful', userId: user.id, name: user.name };
}

export async function createUser(name: string, email: string, password: string) {
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { error: 'User already exists' };
  }

  const newUser = { id: String(users.length + 1), name, email, password };
  users.push(newUser);

  return { message: 'User created successfully', userId: newUser.id };
}