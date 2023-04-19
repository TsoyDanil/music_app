import React from "react";
import IArtist from "../../interfaces/IArtist";

export default interface IArtistBlockProps{
    artist: IArtist
    searchAlbums: React.MouseEventHandler<HTMLButtonElement>
}