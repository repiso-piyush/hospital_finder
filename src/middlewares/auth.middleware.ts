import { NextFunction, Response, Request, Express } from "express";
import jwt from "jsonwebtoken";

const authenticateJWT = (
  req: { user: string | jwt.JwtPayload } | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log('here',token);
  if (!token){
    return res.send(401).json({ error: "unauthorized" });
    
  } 
    

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    console.log( err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default function (app: Express) {
  app.use(authenticateJWT);
  return app;
}
