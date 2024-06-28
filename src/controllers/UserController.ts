
import { Request, Response } from "express";
import prisma from "../index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface  User {
  email: string;
  password :string;
}
function createToken(id: number): string {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
}
class UserController {
  
   
  async register(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });

      const token = createToken(user.id);
      res.status(201).send(token);
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async login (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
          res.status(400).json({ message: 'Invalid username or password' });
          return;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
           res.status(400).json({ message: 'Invalid username or password' });
           return;
      }
      const token = createToken(user.id);
      res.status(201).send(token);
    } catch (error:any) {
       res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }

}

export default new UserController();
