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

    public addArtist = async(artistDto: IArtistDto): Promise<IResponse<IArtist | null>> => {
        return await this.repository.addArtist(artistDto)
    }
}

export const artistsService = new ArtistsService()