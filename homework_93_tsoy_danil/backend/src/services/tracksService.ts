import { Request } from "express";
import IResponse from "../interfaces/IResponse";
import ITrack from "../interfaces/ITrack";
import ITrackDto from "../interfaces/ITrackDto";
import { MongooseDB, mongooseDB } from "../repository/mongooseDB";


export class TracksService {
    private repository: MongooseDB
    constructor(){
        this.repository = mongooseDB
    }
    
    public getTracks = async(req: Request): Promise<IResponse<ITrack[] | null>> => {
        return await this.repository.getTracks(req)
    }

    public addTrack = async(trackDto: ITrackDto): Promise<IResponse<ITrack | null>> => {
        return await this.repository.addTrack(trackDto)
    }

    public deleteTrackById = async(id: string): Promise<IResponse<ITrack | null>> => {
        return await this.repository.deleteTrackById(id)
    }

    public publishTrackById = async(id: string): Promise<IResponse<ITrack | null>> => {
        return await this.repository.publishTrackById(id)
    }
}

export const tracksService = new TracksService()