import IArtist from "./IArtist";

export default interface IAlbum{
    _id: string
    title: string;
    artist: IArtist
    releaseYear: Date
    coverImage: string
}