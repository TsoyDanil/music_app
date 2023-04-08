import IAlbum from "../../interfaces/IAlbum";

export default interface IAlbumsState {
    targetedAlbum: IAlbum | null
    albumsList: IAlbum[]
    unpublishedAlbums: IAlbum[]
    albumsLoading: boolean
    albumsMessage: string
}