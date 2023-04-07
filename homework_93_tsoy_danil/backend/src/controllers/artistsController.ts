import express, { Request, Response, Router } from "express";
import multer from "multer";
import shortid from "shortid";
import { config } from "../index.config";
import path from 'path'
import { artistsService, ArtistsService } from "../services/artistsService";
import { EStatuses } from "../enum/EStatuses";
import { auth } from "../middlewares/auth";
import { permissionCheck } from "../middlewares/permissionCheck";

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, config.filePath + '/artists')
    },
    filename(req, file, callback){
        callback(null, shortid.generate() + path.extname(file.originalname))
    },
})

const upload = multer({storage})

export class ArtistsController {
    private router: Router
    private service: ArtistsService
    constructor() {
        this.router = express.Router()
        this.service = artistsService
        this.router.get('/', this.getArtists)
        this.router.post('/', [auth, upload.single('photo')], this.addArtist)
    }

    public getRouter () {
        return this.router;
    }

    private getArtists = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getArtists()
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private addArtist = async (req: Request, res: Response): Promise<void> => {
        const artistDto = req.body
        artistDto.photo = req.file ? req.file.filename : ''
        const response = await this.service.addArtist(artistDto)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }
}

export const artistsController = new ArtistsController()