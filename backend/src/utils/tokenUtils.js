import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET is required in production");
}

const resolvedJwtSecret = JWT_SECRET || "dev-only-jwt-secret";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, resolvedJwtSecret, { expiresIn: JWT_EXPIRY });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, resolvedJwtSecret);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
