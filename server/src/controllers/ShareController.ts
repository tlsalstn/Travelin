import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Share } from "../entity/Share";
import { User } from "../entity/User";

class ShareController {
    static createPost = async (req: Request, res: Response) => {
        const { userId, title, content, points }: Share = req.body;

        if (!(userId && title && content && points)) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }

        const shareRepository = getRepository(Share);

        try {
            const share = shareRepository.create({ userId, title, content, points });
            console.log(share);

            await shareRepository.save(share);
            res.json();
        } catch (error) {
            console.log(error);

            res.status(500);
        }
    }

    static getPosts = async (req: Request, res: Response) => {
        const shareRepository = getRepository(Share);

        try {
            const posts = await shareRepository.find();

            console.log(posts);

            const result = {
                status: 200,
                data: posts
            }

            res.json(result);
        } catch (error) {
            console.log(error);

            const result = {
                status: 500,
                message: "Internal server error"
            }

            res.json(result);
        }
    }
}

export default ShareController;