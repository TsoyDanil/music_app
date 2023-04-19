import { EStatuses } from "../enum/EStatuses"
import IResponse from "../interfaces/IResponse"
import IUserDto from "../interfaces/IUserDto"
import IUserGetDto from "../interfaces/IUserGetDto"
import { instance } from "./instances"


class UsersApi {
    public addUser = async (user: IUserDto): Promise<IResponse<IUserGetDto | null>> => {
        try{
            const response = await instance.post('/users', user)
            return response.data
        } catch(err: unknown){
            console.log(err)
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public loginUser = async (user: IUserDto): Promise<IResponse<IUserGetDto | null>> => {
        try{
            const response = await instance.post('/users/sessions', user)
            return response.data
        } catch(err: unknown){
            console.log(err)
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public checkToken = async (): Promise<IResponse<IUserGetDto | null>> => {
        try{
            const response = await instance.get('/users/token')
            return response.data
        } catch(err: unknown){
            const error = err as Error
            const response: IResponse<null> ={
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }
}

export const usersApi = new UsersApi()