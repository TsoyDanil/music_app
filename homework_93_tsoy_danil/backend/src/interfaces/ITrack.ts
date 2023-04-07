import { Types } from "mongoose";import IAlbum from "./IAlbum";

export default interface ITrack{
    _id: Types.ObjectId
    title: string
    album: IAlbum
    length: number
    index: number
    link: string
    generateIndex: (index: number) => number
}