import IAlbum from "./IAlbum";

export default interface ITrack{
    _id: string
    title: string
    album: IAlbum
    length: number
    index: number
    link: string
}