import ITrack from "./ITrack";

export default interface ITrackDto {
    title: ITrack['title']
    album: ITrack['album']
    length: ITrack['length']
    link?: string
}