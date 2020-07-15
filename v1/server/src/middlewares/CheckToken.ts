import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    console.log("CheckToken");
    const token = <string>req.headers["token"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, jwtSecret.code);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        const result = {
            status: 401,
            message: "Token expired"
        }
        
        res.send(result);
        return;
    }

    const { id, userId, name} = jwtPayload;
    const newToken = jwt.sign(
        {id, userId, name},
        jwtSecret.code,
        {expiresIn: "1h"}
    );

    req.headers.id = id;
    req.headers.userId = userId;
    res.setHeader("token", newToken);

    next();
}