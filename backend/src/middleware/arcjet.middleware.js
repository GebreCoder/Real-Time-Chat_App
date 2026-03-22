// src/middleware/arcjet.middleware.js
import aj from "../lib/arcjet.js";

export const arcjetProtection = async (req, res, next) => {
  next(); // always allow
};
