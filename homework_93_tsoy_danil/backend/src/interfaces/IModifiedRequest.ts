import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export default interface IModifiedRequest extends Request {
    verifiedData: string | JwtPayload
}