import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["token"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, jwtSecret.code);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }

    const { userId, name, nickName } = jwtPayload;
    const newToken = jwt.sign(
        {userId, name, nickName},
        jwtSecret.code,
        {expiresIn: "1h"}
    );

    res.setHeader("token", newToken);

    next();
}