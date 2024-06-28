import { Express } from 'express';
import hospitalRouter from './hospitalRouter';
export default function (app:Express) {
    app.use('/', hospitalRouter);
    return app;
};