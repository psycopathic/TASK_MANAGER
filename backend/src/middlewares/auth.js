import { verifyToken } from "../utils/tokenUtils.js";
import { responseHandler } from "../utils/responseHandler.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json(
          responseHandler(false, 401, "Authorization token is required")
        );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json(responseHandler(false, 401, "Invalid or expired token"));
  }
};
