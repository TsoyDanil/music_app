import mongoose from "mongoose";
import IArtist from "../interfaces/IArtist";

const Schema = mongoose.Schema

const ArtistSchema = new Schema<IArtist>({
    name:{
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        required: [true, 'Artists name should exist']
    },
    photo:{
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        required: [true, 'Artists photo should exist']
    },
    information:{
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        required: [true, 'Artists info should exist']
    },
    isPublished: {
        type: Boolean,
        required: false,
        default: false
    }
}, {versionKey: false})

export const Artist = mongoose.model<IArtist>('Artist', ArtistSchema)