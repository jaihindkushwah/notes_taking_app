import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import jwt from "jsonwebtoken";
export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // ipv6Subnet: 56,
  keyGenerator: (req: any) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return ipKeyGenerator(req.ip);
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded.id || ipKeyGenerator(req.ip);
    } catch (error) {
      console.log(error);
      return ipKeyGenerator(req.ip);
    }
  },
});
