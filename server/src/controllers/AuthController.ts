import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";

class AuthController {
    static register = async (req: Request, res: Response) => {
        const { userId, password, name } = req.body;
        const userRepogitory = getRepository(User);

        if(!(userId && password && name )) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }

        try {
            const user = userRepogitory.create({userId, password, name});

            await userRepogitory.insert(user);
            
            const result = {
                status: 200
            }

            res.json(result);
        } catch (error) {
            console.log(error);
            const result = {
                status: 400,
                message: "Duplicate id"
            }

            res.json(result);
        }
    }

    static login = async (req: Request, res: Response) => {
        const { userId, password } = req.body;
        const userRepogitory = getRepository(User);

        if(!(userId && password)) {
            const result = {
                status: 400,
                message: "Please enter all the information"
            }

            res.json(result);
            return;
        }
            
        try {
            const user = await userRepogitory.findOne({
                where: [
                    {userId: userId, password: password}
                ]
            });

            if(!user) {  
                const result = {
                    status: 401,
                    message: "The id or password is incorrect"
                }
    
                res.json(result);
                return;
            }

            const token = jwt.sign(
                { id: user.id, userId: user.userId, name: user.name },
                jwtSecret.code,
                { expiresIn: "1h" }
            );

            const result = {
                status: 200,
                data: {
                    token: token
                }
            }

            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

export default AuthController;