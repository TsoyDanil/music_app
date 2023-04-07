import {Document, Types} from "mongoose"

export default interface IUser extends Document {
    _id: Types.ObjectId
    username: string
    password: string
    role: string
    checkPassword: (pass: string) => boolean
}