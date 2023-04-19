import { Types } from "mongoose";
import ITrack from "./ITrack";
import IUser from "./IUser";

export default interface ITrackHistory {
    _id: Types.ObjectId
    user: IUser['_id']
    track: ITrack
    datetime: Date
}