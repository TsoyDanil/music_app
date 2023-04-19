import mongoose from "mongoose";
import IAlbum from "../interfaces/IAlbum"

const Schema = mongoose.Schema

const AlbumSchema = new Schema<IAlbum>({
    title:{
        type: String,
        trim: true,
        minlength: 1,
        required: [true, 'Album title should exist']
    },
    artist:{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        minlength: 1,
        required: [true, 'Artists name should exist']
    },
    releaseYear:{
        type: Date,
        required: [true, 'Release year of album should exist']
    },
    coverImage:{
        type: String,
        required: [true, 'Cover image should exist']
    },
    isPublished: {
        type: Boolean,
        required: false,
        default: false
    }
}, {versionKey: false})

export const Album = mongoose.model<IAlbum>('Album', AlbumSchema)

