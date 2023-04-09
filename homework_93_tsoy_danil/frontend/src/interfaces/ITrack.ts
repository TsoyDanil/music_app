import IAlbum from "./IAlbum";

export default interface ITrack{
    _id: string
    title: string
    album: IAlbum['_id']
    length: number
    index: number
    link: string
    isPublished: boolean
}