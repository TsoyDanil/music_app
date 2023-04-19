import ITrack from "./ITrack";
import IUserGetDto from "./IUserGetDto";

export default interface ITrackHistoryDto{
    user: IUserGetDto['username']
    track: ITrack['_id']
}