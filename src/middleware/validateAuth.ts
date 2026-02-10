import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validateAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.headers.authorization.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // console.log(decoded);

    (req as any).user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
