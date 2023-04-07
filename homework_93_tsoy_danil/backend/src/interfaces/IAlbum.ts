import { Types } from "mongoose";
import IArtist from "./IArtist";

export default interface IAlbum{
    _id: Types.ObjectId
    title: string
    artist: IArtist
    releaseYear: Date
    coverImage: string
    isPublished: boolean
}