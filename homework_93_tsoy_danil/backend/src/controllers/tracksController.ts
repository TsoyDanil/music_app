import express, { Request, Response, Router } from "express";
import { EStatuses } from "../enum/EStatuses";
import ITrackDto from "../interfaces/ITrackDto";
import { tracksService, TracksService } from "../services/tracksService";
import { auth } from "../middlewares/auth";
import { permissionCheck } from "../middlewares/permissionCheck";
import { ERoles } from "../enum/ERoles";


export class TracksController {
    private router: Router
    private service: TracksService
    constructor() {
        this.router = express.Router()
        this.service = tracksService
        this.router.get('/', this.getTracks)
        this.router.post('/', auth, this.addTrack)
        this.router.delete('/:id', permissionCheck([ERoles.ADMIN]), this.deleteTrackById)
        this.router.post('/:id', permissionCheck([ERoles.ADMIN]), this.publishTrackById)
    }

    public getRouter () {
        return this.router;
    }

    private getTracks = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getTracks(req)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    } 

    private addTrack = async (req: Request, res: Response): Promise<void> => {
        const trackDto: ITrackDto = req.body
        const response = await this.service.addTrack(trackDto)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private deleteTrackById = async(req: Request, res: Response): Promise<void> => {
        const response = await this.service.deleteTrackById(req.params.id)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private publishTrackById = async(req: Request, res: Response): Promise<void> => {
        const response = await this.service.publishTrackById(req.params.id)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }
}

export const tracksController = new TracksController()