import { ERoles } from "../enum/ERoles"

export default interface IUser extends Document {
    _id: string
    username: string
    password: string
    token: string
    role: ERoles
}