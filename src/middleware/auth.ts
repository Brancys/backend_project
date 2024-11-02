import { NextFunction, Request, Response } from "express";
import {decode} from "jsonwebtoken";

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

    if (request.headers.authorization === undefined) {
        return response.status(401).json({
            message: "Not authorized."
        })
    }

 const jwtValues = decode(request.headers.authorization);
 
 // hago busqueda de usuario usando id de JWT Values

 request.body.user = jwtValues;
 
 next();
}