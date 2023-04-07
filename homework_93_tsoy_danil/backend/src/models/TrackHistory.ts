import mongoose, {Schema} from "mongoose";
import ITrackHistory from "../interfaces/ITrackHistory";


const TrackHistorySchema: Schema = new Schema<ITrackHistory>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User should exist']
    },
    track:{
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: [true, 'Track should exist']
    },
    datetime:{
        type: Date,
        required: false,
        default: Date.now
    }
},{versionKey: false})

export const TrackHistory = mongoose.model<ITrackHistory>('TrackHistory', TrackHistorySchema)

