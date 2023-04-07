import IAlbum from "../../interfaces/IAlbum";

export default interface IAlbumsState {
    targetedAlbum: IAlbum | null
    albumsList: IAlbum[]
    albumsLoading: boolean
    albumsMessage: string
}