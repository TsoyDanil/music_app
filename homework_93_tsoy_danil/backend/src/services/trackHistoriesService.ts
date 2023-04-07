import IResponse from "../interfaces/IResponse"
import ITrackHistory from "../interfaces/ITrackHistory"
import ITrackHistoryDto from "../interfaces/ITrackHistoryDto"
import { MongooseDB, mongooseDB } from "../repository/mongooseDB"

export class TrackHistoriesService {
    private repository: MongooseDB
    constructor(){
        this.repository = mongooseDB
    }

    public addTrackHistory = async(trackHistoryDto: ITrackHistoryDto): Promise<IResponse<ITrackHistory | null>> => {
        return await this.repository.addTrackHistory(trackHistoryDto)
    }

    public getTrackHistoryByToken = async(userDataName: string): Promise<IResponse<ITrackHistory[] | null>> => {
        return await this.repository.getTrackHistoryByToken(userDataName)
    }
}

export const trackHistoriesService = new TrackHistoriesService()