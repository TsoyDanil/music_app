import IAlbum from "./IAlbum"
import IArtist from "./IArtist"

export default interface IAlbumDto{
    title: IAlbum['title']
    artist: IArtist
    releaseYear: IAlbum['releaseYear']
    coverImage: File
}