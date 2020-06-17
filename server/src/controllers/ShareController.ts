import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { Share } from "../entity/Share";
import { User } from "../entity/User";

class ShareController {
    static createPost = async (req: Request, res: Response) => {
        const { userId }: any = req.headers;
        const { title, content, points }: Share = req.body;

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

            const post = await shareRepository.insert(share);

            const result = {
                status: 200,
                data: post
            }
            res.json(result);
        } catch (error) {
            console.log(error);

            res.status(500);
        }
    }

    static getPosts = async (req: Request, res: Response) => {
        const { id } = req.query;
        const shareRepository = getRepository(Share);

        try {
            let posts = null;
            if(!id) {
                posts = await shareRepository.createQueryBuilder("share").leftJoinAndSelect("share.userId", "user").getMany();
            } else {
                posts = await shareRepository.createQueryBuilder("share").leftJoinAndSelect("share.userId", "user").where("share.id = :id", {id: id}).getOne();
            }

            console.log(posts);

            const result = {
                status: 200,
                data: [posts]
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