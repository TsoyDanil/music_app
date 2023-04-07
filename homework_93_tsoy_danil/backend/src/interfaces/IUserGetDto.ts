import { Types } from "mongoose";
import IUSer from "./IUser";

export default interface IUserGetDto {
    _id: Types.ObjectId
    username: IUSer['username']
    token: string
    role: IUSer['role']
}