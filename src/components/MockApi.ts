
// I have created a mock API for login and signup. This is just a simulation of how a real API would work.

let usersDb: { [key: string]: string } = {}; 

export const mockApiLogin = (email: string, password: string) => {
  return new Promise<{ message: string; token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (usersDb[email] && usersDb[email] === password) {
        resolve({ message: 'Login successful', token: 'fake-jwt-token' });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1500); 
  });
};

export const mockApiSignup = (email: string, password: string) => {
  return new Promise<{ message: string; token: string }>((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error('Please fill in all fields'));
        return;
      }

      if (usersDb[email]) {
        reject(new Error('Email already exists'));
      } else {
        usersDb[email] = password;
        resolve({ message: 'Signup successful', token: 'fake-jwt-token' });
      }
    }, 1500); 
  });
};
