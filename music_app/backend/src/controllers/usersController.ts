import express, { Request, Response, Router } from "express"
import { EStatuses } from "../enum/EStatuses";
import IResponse from "../interfaces/IResponse";
import IUser from "../interfaces/IUser";
import IUserGetDto from "../interfaces/IUserGetDto";
import { auth } from "../middlewares/auth";
import { usersService, UsersService } from "../services/usersService";
import IModifiedRequest from "../interfaces/IModifiedRequest";


export class UsersController {
    private service: UsersService
    private router: Router
    constructor(){
        this.service = usersService
        this.router = express.Router()
        this.router.post('/', this.addUser)
        this.router.post('/sessions', this.loginUser)
        this.router.get('/token', auth, this.checkToken)
    }

    public getRouter = () => {
        return this.router
    }

    private addUser = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | null> = await this.service.addUser(req.body)
        res.status(200).send(response)
    }

    public loginUser = async(req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | null> = await this.service.loginUser(req.body)
        res.status(200).send(response)
    }

    public checkToken = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IModifiedRequest
        const response: IResponse<IUserGetDto | null> = {
            status: EStatuses.SUCCESS,
            result: req.verifiedData as IUserGetDto,
            message: 'Token is ok'
        }
        res.status(200).send(response)
    }
}

export const usersController = new UsersController()