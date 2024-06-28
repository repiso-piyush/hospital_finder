import { Express } from "express";
import userRouter from './userRouter'
export default function(app:Express){
    app.use('/',userRouter);
    return app;
};
