import { trackHistoriesService, TrackHistoriesService } from "../services/trackHistoriesService"
import express, { Request, Response, Router } from "express";
import ITrackHistoryDto from "../interfaces/ITrackHistoryDto";
import { EStatuses } from "../enum/EStatuses";
import { auth } from "../middlewares/auth";
import IModifiedRequest from "../interfaces/IModifiedRequest";

export class TrackHistoriesController {
    private router: Router
    private service: TrackHistoriesService
    constructor() {
        this.router = express.Router()
        this.service = trackHistoriesService
        this.router.post('/', auth, this.addTrackHistory)
        this.router.get('/', auth, this.getTrackHistoryByToken)
    }

    public getRouter () {
        return this.router;
    }

    private addTrackHistory = async (req: Request, res: Response): Promise<void> => {
        const modifiedReq = req as IModifiedRequest
        if (typeof modifiedReq.verifiedData === 'object' && 'username' in modifiedReq.verifiedData){
            const trackHistoryDto: ITrackHistoryDto = {
                user: modifiedReq.verifiedData.username,
                track: req.body.track
            }
            const response = await this.service.addTrackHistory(trackHistoryDto)
            response.status === EStatuses.FAILURE ? res.status(401).send(response) : res.status(200).send(response)
        } else{
            res.status(418).send('error in request. Some invalid field appeared')
        }
    }

    private getTrackHistoryByToken = async (req: Request, res: Response): Promise<void> => {
        const modifiedReq = req as IModifiedRequest
        if (typeof modifiedReq.verifiedData === 'object' && 'username' in modifiedReq.verifiedData){
            const response = await this.service.getTrackHistoryByToken(modifiedReq.verifiedData?.username)
            res.status(200).send(response)
        } else{
            res.status(418).send('error in request. Some invalid field appeared')
        }
    }
}

export const trackHistoriesController = new TrackHistoriesController()