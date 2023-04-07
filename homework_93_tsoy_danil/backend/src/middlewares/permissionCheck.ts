import { NextFunction, Request, Response } from "express";
import IModifiedRequest from "../interfaces/IModifiedRequest";
import IResponse from "../interfaces/IResponse";
import { EStatuses } from "../enum/EStatuses";
import jwt from 'jsonwebtoken'

export const permissionCheck = (role: string) => {
    return (modifiedRequest: Request, res: Response, next: NextFunction) => {
        const req = modifiedRequest as IModifiedRequest
        if (req.method === 'OPTIONS'){
            next()
        }
        try{
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token){
                throw new Error('Token not provided')
            } 
            const verifiedData = jwt.verify(token, process.env.SECRET_KEY as string);
            if (typeof verifiedData === 'object' && verifiedData.role === role){
                req.verifiedData = verifiedData
                next()
            } else{
                throw new Error('Invalid data in permission check')
            }
        } catch(err: unknown){
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.FAILURE,
                result: undefined,
                message: error.message
            }
            res.status(200).send(response)
        }
    }
}