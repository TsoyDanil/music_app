import {Document, Types} from "mongoose"
import { ERoles } from "../enum/ERoles"

export default interface IUser extends Document {
    _id: Types.ObjectId
    username: string
    password: string
    role: ERoles
    checkPassword: (pass: string) => boolean
}