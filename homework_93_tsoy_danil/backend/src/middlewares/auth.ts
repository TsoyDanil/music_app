import { NextFunction, Request, Response } from "express";
import { EStatuses } from "../enum/EStatuses";
import IResponse from "../interfaces/IResponse";
import jwt from 'jsonwebtoken'
import IRequestWithTokenData from "../interfaces/IModifiedRequest";

export const auth = (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as IRequestWithTokenData
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token){
            throw new Error('Token not provided')
        } 
        const verifiedData = jwt.verify(token, process.env.SECRET_KEY as string);
        req.verifiedData = verifiedData
        next()
    } catch(err: unknown) {
        const error = err as Error
        const response: IResponse<undefined> = {
            status: EStatuses.FAILURE,
            result: undefined,
            message: error.message
        }
        res.status(200).send(response)
    }
}