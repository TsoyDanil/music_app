import express, { Request, Response, Router } from "express";
import multer from "multer";
import shortid from "shortid";
import { config } from "../index.config";
import path from 'path'
import { albumsService, AlbumsService } from "../services/albumsService";
import { EStatuses } from "../enum/EStatuses";
import { auth } from "../middlewares/auth";
import { permissionCheck } from "../middlewares/permissionCheck";
import { ERoles } from "../enum/ERoles";

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, config.filePath + '/albums')
    },
    filename(req, file, callback){
        callback(null, shortid.generate() + path.extname(file.originalname))
    },
})

const upload = multer({storage})

export class AlbumsController {
    private router: Router
    private service: AlbumsService
    constructor() {
        this.router = express.Router()
        this.service = albumsService
        this.router.get('/', this.getAlbums)
        this.router.get('/:id', this.getAlbums)
        this.router.post('/', [auth, upload.single('coverImage')], this.addAlbum)
        this.router.delete('/:id', permissionCheck([ERoles.ADMIN]), this.deleteAlbumById)
        this.router.post('/:id', permissionCheck([ERoles.ADMIN]), this.publishAlbumById)
    }

    public getRouter () {
        return this.router;
    }

    private getAlbums = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getAlbums(req)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private addAlbum = async (req: Request, res: Response): Promise<void> => {
        const albumDto = req.body
        albumDto.coverImage = req.file ? req.file.filename : ''
        const response = await this.service.addAlbum(albumDto)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private deleteAlbumById = async(req: Request, res: Response): Promise<void> => {
        const response = await this.service.deleteAlbumById(req.params.id)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }

    private publishAlbumById = async(req: Request, res: Response): Promise<void> => {
        const response = await this.service.publishAlbumById(req.params.id)
        if (response.status === EStatuses.FAILURE){
            res.status(418).send(response)
        } else{
            res.send(response)
        }
    }
}

export const albumsController = new AlbumsController()