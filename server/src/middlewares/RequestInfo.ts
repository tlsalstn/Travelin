import { Request, Response, NextFunction } from "express";
import * as colors from "colors";

export const RequestInfo = (req: Request, res: Response, next: NextFunction) => {
    console.log(colors.yellow("\nMethod: " + req.method));
    console.log(colors.yellow("OriginalURL: " + req.originalUrl));

    next();
}