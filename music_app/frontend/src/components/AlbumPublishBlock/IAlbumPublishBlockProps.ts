import { MouseEventHandler } from "react";
import IAlbum from "../../interfaces/IAlbum";

export default interface IAlbumPublishBlockProps {
    album: IAlbum
    publishAlbum: MouseEventHandler<HTMLButtonElement>
    deleteAlbum: MouseEventHandler<HTMLButtonElement>
}