import express, { Request, Response, Router } from "express";
import { EStatuses } from "../enum/EStatuses";
import ITrackDto from "../interfaces/ITrackDto";
import { tracksService, TracksService } from "../services/tracksService";
import { auth } from "../middlewares/auth";


export class TracksController {
    private router: Router
    private service: TracksService
    constructor() {
        this.router = express.Router()
        this.service = tracksService
        this.router.get('/', this.getTracks)
        this.router.post('/', auth, this.addTrack)
    }

    public getRouter () {
        return this.router;
    }

    private getTracks = async (req: Request, res: Response) => {
        const response = await this.service.getTracks(req)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    } 

    private addTrack = async (req: Request, res: Response) => {
        const trackDto: ITrackDto = req.body
        const response = await this.service.addTrack(trackDto)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }
}

export const tracksController = new TracksController()