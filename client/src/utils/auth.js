const jwtDecode = require('jwt-decode');

// Decode JWT and return the user data
export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  
  if (!token) return null; // No token means no user is logged in
  
  try {
    const decodedToken = jwtDecode(token); // Decode the JWT
    return decodedToken; // Returns the user data inside the token
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
};
