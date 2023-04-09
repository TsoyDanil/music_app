import { MouseEventHandler } from "react";
import IArtist from "../../interfaces/IArtist";

export default interface IArtistPublishBlockProps{
    artist: IArtist
    publishArtist: MouseEventHandler<HTMLButtonElement>
    deleteArtist: MouseEventHandler<HTMLButtonElement>
}