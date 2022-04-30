import jwt_decode from 'jwt-decode';

export const getUserViaToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const tokenValue: any = jwt_decode(token);
    return tokenValue.user;
  }
  return null;
};

export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }
  return null;
};
