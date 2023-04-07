import { EStatuses } from "../enum/EStatuses";
import IAlbum from "../interfaces/IAlbum";
import IResponse from "../interfaces/IResponse";
import { instance } from "./instances";


class AlbumsApi {
    public getAlbums = async(): Promise<IResponse<IAlbum[] | null>> => {
        try{
            const response = await instance.get('/albums')
            return response.data
        } catch(err: unknown){
            console.log(err);
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.FAILURE,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public getAlbumsByArtistId = async(id: string):Promise<IResponse<IAlbum[] | null>> => {
        try{
            const response = await instance.get(`/albums?artist=${id}`)
            return response.data
        } catch(err: unknown){
            console.log(err);
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

export const albumsApi = new AlbumsApi()