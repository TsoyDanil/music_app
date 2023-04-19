import IArtist from "../interfaces/IArtist";
import IArtistDto from "../interfaces/IArtistDto";
import IResponse from "../interfaces/IResponse";
import { MongooseDB, mongooseDB } from "../repository/mongooseDB";


export class ArtistsService {
    private repository: MongooseDB
    constructor(){
        this.repository = mongooseDB
    }
    
    public getArtists = async(): Promise<IResponse<IArtist[] | null>> => {
        return await this.repository.getArtists()
    }

    public getUnpublishedArtists = async(): Promise<IResponse<IArtist[] | null>> => {
        return await this.repository.getUnpublishedArtists()
    }

    public addArtist = async(artistDto: IArtistDto): Promise<IResponse<IArtist | null>> => {
        return await this.repository.addArtist(artistDto)
    }

    public deleteArtistById = async(id: string): Promise<IResponse<IArtist | null>> => {
        return await this.repository.deleteArtistById(id)
    }

    public publishArtistById = async(id: string): Promise<IResponse<IArtist | null>> => {
        return await this.repository.publishArtistById(id)
    }
}

export const artistsService = new ArtistsService()