import { EStatuses } from "../enum/EStatuses";
import IResponse from "../interfaces/IResponse";
import ITrack from "../interfaces/ITrack";
import ITrackDto from "../interfaces/ITrackDto";
import { instance } from "./instances";

class TracksApi {

    public getTracks = async(): Promise<IResponse<ITrack[] | null>> => {
        try{
            const response = await instance.get('/tracks')
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

    public getTracksByAlbumId = async(id: string): Promise<IResponse<ITrack[] | null>> => {
        try{
            const response = await instance.get(`/tracks?album=${id}`)
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

    public getUnpublishedTracks = async(): Promise<IResponse<ITrack[] | null>> => {
        try{
            const response = await instance.get('/tracks/unpublished')
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

    public addTrack = async(trackDto: ITrackDto): Promise<IResponse<ITrack | null>> => {
        try{
            const response = await instance.post('/tracks', trackDto)
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

    public deleteTrackById = async(id: string): Promise<IResponse<ITrack | null>> => {
        try{
            const response = await instance.delete(`/tracks/${id}`)
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

    public publishTrackById = async(id: string): Promise<IResponse<ITrack | null>> => {
        try{
            const response = await instance.post(`/tracks/${id}/publish`)
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

export const tracksApi = new TracksApi()