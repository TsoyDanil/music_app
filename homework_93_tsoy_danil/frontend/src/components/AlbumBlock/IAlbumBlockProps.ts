import IAlbum from "../../interfaces/IAlbum";

export default interface IAlbumBlockProps {
    album: IAlbum
    searchTracks: React.MouseEventHandler<HTMLDivElement>
}