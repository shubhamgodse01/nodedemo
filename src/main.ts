import * as dotenv from 'dotenv'
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import { 
    newPostRouter,
    deletePostRouter, 
    updatePostRouter, 
    showPostRouter, 
    newCommentRouter, 
    deleteCommentRouter } from './routers'

const app = express()

app.use(cors(
    {
        origin: "*",
        optionsSuccessStatus: 200
    }
))

app.use(urlencoded({
    extended: true
}))
app.use(json())  //this will return respons as json
app.use(newPostRouter)
app.use(deletePostRouter)
app.use(updatePostRouter)
app.use(showPostRouter)
app.use(newCommentRouter)
app.use(deleteCommentRouter)
app.all('*', (req, res, next) => {
    const error = new Error('Not found!') as CustomError;
    error.status = 404
    next(error)
})
declare global {
    interface CustomError extends Error {
        status?: number
    }
}
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(error.status){
        return res.status(error.status).json({message: error.message});
    }

    res.status(500).json({message: 'Something went wrong'})
})

const start = async () => {
    if(!process.env.MONGO_URI) throw new Error('MONGO_URI is required!')

    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connection successful!');
    } catch(err){
        throw new Error('database error!')
    }
    app.listen(8080, () => console.log('server is up and running on port 8080'))
}

start()