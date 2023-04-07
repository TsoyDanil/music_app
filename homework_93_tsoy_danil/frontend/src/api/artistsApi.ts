import { EStatuses } from "../enum/EStatuses";
import IArtist from "../interfaces/IArtist";
import IArtistDto from "../interfaces/IArtistDto";
import IResponse from "../interfaces/IResponse";
import { instance } from "./instances";


class ArtistsApi {
    public getArtists = async(): Promise<IResponse<IArtist[] | null>> => {
        try{
            const response = await instance.get('/artists')
            return response.data
        } catch(err: unknown){
            console.log(err)
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public addArtist = async(artistDto: IArtistDto): Promise<IResponse<IArtist | null>> => {
        try{
            const response = await instance.post('/artists', artistDto)
            return response.data
        } catch(err: unknown){
            console.log(err)
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public deleteArtistById = async(id: string): Promise<IResponse<IArtist | null>> => {
        try{
            const response = await instance.delete(`/artists/${id}`)
            return response.data
        } catch(err: unknown){
            console.log(err)
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public publishArtistById = async(id: string): Promise<IResponse<IArtist | null>> => {
        try{
            const response = await instance.post(`/artists/${id}/publish`)
            return response.data
        } catch(err: unknown){
            console.log(err)
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }
}

export const artistsApi = new ArtistsApi()

