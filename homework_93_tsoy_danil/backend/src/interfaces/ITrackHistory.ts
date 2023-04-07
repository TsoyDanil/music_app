import ITrack from "./ITrack";
import IUser from "./IUser";

export default interface ITrackHistory {
    user: IUser['_id']
    track: ITrack
    datetime: Date
}