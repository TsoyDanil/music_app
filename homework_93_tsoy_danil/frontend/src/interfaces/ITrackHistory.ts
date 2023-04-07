import ITrack from "./ITrack";
import IUser from "./IUser";

export default interface ITrackHistory {
    _id: string
    user: IUser['_id']
    track: ITrack
    datetime: Date
}