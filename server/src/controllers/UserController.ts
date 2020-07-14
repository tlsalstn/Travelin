import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

class UserController {
    static getUser = async (req: Request, res: Response) => {
        if(req.headers.userId === undefined) {
            const message: String = "userId가 없습니다.";

            const result = {
                status: 400,
                message: message
            }

            res.status(400).json(result);

            return;
        }

        let user: User;
        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail({
                where: [
                    {userId: req.headers.userId}
                ]
            });

            const result = {
                status: 200,
                data: user
            }

            res.status(200).json(result);
            return;
        } catch (error) {
            const message: String = "일치하는 유저가 없습니다.";

            const result = {
                status: 401,
                message: message
            }

            res.json(result);
            return;
        }
    }
    
    static getUsers = async (req: Request, res: Response) => {
        let users: User[];
        const userRepository = getRepository(User);

        try {
            users = await userRepository.find();

            const result = {
                status: 200,
                data: users
            }

            res.json(result);
            return;
        } catch (error) {
            const result = {
                status: 500,
                message: error
            }

            res.json(result);
            return;
        }
    }
}

export default UserController;