import { ERoles } from "../enum/ERoles";
import IUSer from "./IUser";

export default interface IUserGetDto {
    _id: string
    username: IUSer['username']
    token: string,
    role: ERoles
}
