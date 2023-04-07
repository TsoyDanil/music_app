import IResponse from "../interfaces/IResponse";
import IUser from "../interfaces/IUser";
import IUserCreateDto from "../interfaces/IUserCreateDto";
import IUserGetDto from "../interfaces/IUserGetDto";
import { mongooseDB, MongooseDB } from "../repository/mongooseDB";


export class UsersService {
    private repository: MongooseDB
    constructor(){
        this.repository = mongooseDB
    }

    public addUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        return await this.repository.addUser(userDto)
    }

    public loginUser = async (userDto: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        return await this.repository.loginUser(userDto)
    }
}

export const usersService = new UsersService()