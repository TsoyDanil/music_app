import IAlbum from "./IAlbum"
import IArtist from "./IArtist"

export default interface IAlbumDto{
    title: IAlbum['title']
    artist: IArtist['_id']
    releaseYear: IAlbum['releaseYear'] | null
    coverImage?: File
}