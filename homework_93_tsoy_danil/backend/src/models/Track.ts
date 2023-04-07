import mongoose from "mongoose";
import ITrack from "../interfaces/ITrack";


const Schema = mongoose.Schema

const TrackSchema = new Schema<ITrack>({
    title:{
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        required: [true, 'Track title should exist']
    },
    album:{
        type: Schema.Types.ObjectId,
        ref: 'Album',
        trim: true,
        minlength: 1,
        required: [true, 'Album should exist']
    },
    length:{
        type: Number,
        minimum: 10,
        required: [true, 'Track length should exist']
    },
    link:{
        type: String,
        required: false,
        trim: true
    },
    index:{
        type: Number,
        required: false
    }
}, {versionKey: false})

TrackSchema.methods.generateIndex = async function(index: number){
    this.index = index + 1
}

export const Track = mongoose.model<ITrack>('Track', TrackSchema)