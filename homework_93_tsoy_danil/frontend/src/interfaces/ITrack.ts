import IAlbum from "./IAlbum";

export default interface ITrack{
    _id: string
    title: string
    album: string
    length: number
    index: number
    link: string
    isPublished: boolean
}