import IAlbum from "../interfaces/IAlbum";
import IResponse from "../interfaces/IResponse";
import IAlbumDto from "../interfaces/IAlbumDto";
import { Request } from "express";
import { MongooseDB, mongooseDB } from "../repository/mongooseDB";

export class AlbumsService {

    private repository: MongooseDB
    constructor(){
        this.repository = mongooseDB
    }

    public getAlbums = async(req: Request): Promise<IResponse<IAlbum[] | IAlbum | null>> => {
        return await this.repository.getAlbums(req)
    }

    public addAlbum = async(albumDto: IAlbumDto): Promise<IResponse<IAlbum | null>> => {
        return await this.repository.addAlbum(albumDto)
    }
}

export const albumsService = new AlbumsService()
