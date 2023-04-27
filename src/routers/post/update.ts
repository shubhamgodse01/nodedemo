import { NextFunction, Request, Response, Router } from "express";
import Post from '../../models/post'

const router = Router();

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { content, title } = req.body;

    if(!id) {
        const error = new Error('Post id is required!') as CustomError
        error.status = 400
        next(error)
    }

    let updatedPost;

    try {
        updatedPost = await Post.findOneAndUpdate(
            { _id: id}, 
            { $set: { content, title}}, 
            { new: true}
        )
    } catch(err){
        const error = new Error('Post cannot be updated!') as CustomError
        error.status = 400 
        next(error)
    }

    res.status(200).send(updatedPost)
})

export { router as updatePostRouter}