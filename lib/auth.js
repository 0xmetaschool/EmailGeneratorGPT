// lib/auth.js
import { SignJWT, jwtVerify } from 'jose';
import { hash, compare } from 'bcryptjs';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}