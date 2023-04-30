import jwt from 'jsonwebtoken';

export const generateToken = (id: number) => {
  return jwt.sign({ id }, 'secret_token', {
    expiresIn: '30d',
  });
};
