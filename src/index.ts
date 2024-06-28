import express,{ Request, Response,NextFunction } from 'express';
import cors from 'cors';
import {PrismaClient } from "@prisma/client";
import authorized from './router/authorized';
import unauthorized from './router/unauthorized';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authMiddleware from './middlewares';

dotenv.config()

const app = express();
const port = parseInt(process.env.PORT as string);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

unauthorized(app)
authMiddleware(app)
authorized(app)

const prisma = new PrismaClient();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Route not found' });
});
app.listen(3000,()=>{
  console.log(`server listening on port ${port}`)
})

export default prisma;

