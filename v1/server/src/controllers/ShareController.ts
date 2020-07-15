import { Request, Response } from "express";
import { getRepository, createQueryBuilder } from "typeorm";
import { Share } from "../entity/Share";
import { User } from "../entity/User";

class ShareController {
    static createPost = async (req: Request, res: Response) => {
        const { id }: any = req.headers;
        const { title, content, points }: Share = req.body;

        if (!(id && title && content && points)) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }

        const shareRepository = getRepository(Share);

        try {
            const share = shareRepository.create({ userId: id, title, content, points });

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

    static getMyPosts = async (req: Request, res: Response) => {
        const { id } = req.headers;
        const shareRepository = getRepository(Share);

        console.log(id);
        try {
            const share = await shareRepository.createQueryBuilder("share").where({userId: id}).orderBy("id", "DESC").getMany();
            const result = {
                status: 200,
                data: share
            }

            res.send(result);
        } catch (error) {
            console.log(error);
            res.send();
        }
    }

    static remove = async (req: Request, res: Response) => {
        const { id } = req.query;
        const shareRepository = getRepository(Share);

        try {
            await shareRepository.createQueryBuilder("share").delete().from(Share).where("id = :id", {id}).execute();

            const result = {
                status: 200,
                message: "Success"
            }
            res.send(result);
        } catch (error) {
            console.log(error);
            res.send();
        }
    }

    static getPosts = async (req: Request, res: Response) => {
        const { id } = req.query;
        const shareRepository = getRepository(Share);

        try {
            let posts = null;
            if(!id) {
                posts = await shareRepository.createQueryBuilder("share").leftJoinAndSelect("share.userId", "user").orderBy("share_id", "DESC").getMany();
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