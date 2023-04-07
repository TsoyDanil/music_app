import { EStatuses } from "../enum/EStatuses";
import IResponse from "../interfaces/IResponse"
import ITrackHistory from "../interfaces/ITrackHistory"
import ITrackHistoryDto from "../interfaces/ITrackHistoryDto";
import { instance } from "./instances";


class TrackHistoriesApi {
    public getTrackHistoryByToken = async(): Promise<IResponse<ITrackHistory[] | null>> => {
        try{
            const response = await instance.get('/track_history')
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

    public addTrackHistory = async (trackHistoryDto: ITrackHistoryDto) => {
        try{
            const response = await instance.post('/track_history', trackHistoryDto)
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

export const trackHistoriesApi = new TrackHistoriesApi()