import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config()
console.log(process.env.JWTSECRET)
const setUser =(user: string)=>{

   return jwt.sign(user,process.env.JWTSECRET as string)
}
const getUser =(token: any)=>{
    if(!token) return null;
    return jwt.verify(token,process.env.JWTSECRET as string)
 }

