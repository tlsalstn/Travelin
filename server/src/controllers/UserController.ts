import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as colors from "colors";

class UserController {
    static getUser = async (req: Request, res: Response) => {
        console.log(colors.green("GetUsers API Request"));
        console.log(colors.gray("Method: " + req.method));
        console.log(colors.gray("OriginalURL: " + req.originalUrl));

        if(req.query.userId === undefined) {
            const message: String = "userId가 없습니다.";
            console.log(message);

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
                    {userId: req.query.userId}
                ]
            });

            console.log(user);

            const result = {
                status: 200,
                data: user
            }

            res.status(200).json(result);
        } catch (error) {
            const message: String = "일치하는 유저가 없습니다.";

            console.log(error.name);

            const result = {
                status: 401,
                message: message
            }

            res.json(result);
        }
    }
    
    static getUsers = async (req: Request, res: Response) => {
        console.log(colors.green("GetUsers API Request"));
        console.log(colors.gray("Method: " + req.method));
        console.log(colors.gray("OriginalURL: " + req.originalUrl));

        let result;
        let users: User[];
        const userRepository = getRepository(User);

        try {
            users = await userRepository.find();

            const result = {
                status: 200,
                data: users
            }

            console.log(users);

            res.json(result);
        } catch (error) {
            const result = {
                status: 500,
                message: error
            }
            
            console.log(error);

            res.json(result);
        }
    }
}

export default UserController;