import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";

class AuthController {
    static register = async (req: Request, res: Response) => {
        const reg = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        const { userId, password, name, nickName, email } = req.body;
        
        let user = new User();
        user.userId = userId;
        user.password = password;
        user.name = name;
        user.nickName = nickName;
        user.email = email;
    }

    static login = async (req: Request, res: Response) => {
        const { id, password } = req.body;
        const userRepogitory = getRepository(User);

        if(!(id && password)) {
            const message = "id 또는 password가 없습니다.";

            const result = {
                status: 400,
                message: message
            }

            res.status(400).json(result);
            return;
        }
            
        try {
            const user = await userRepogitory.findOneOrFail({
                where: [
                    {userId: id, password: password}
                ]
            });

            const token = jwt.sign(
                {userId: user.userId, name: user.name, nickName: user.nickName},
                jwtSecret.code,
                {expiresIn: "1h"}
            );

            const result = {
                status: 200,
                data: {
                    token: token
                }
            }

            res.status(200).json(result);
        } catch (error) {
            const message = "id 또는 password가 틀렸습니다.";

            console.log(error.name);

            const result = {
                status: 401,
                message: message
            }

            res.status(401).json(result);
        }
    }
}

export default AuthController;