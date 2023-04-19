import { MouseEventHandler } from "react";
import ITrack from "../../interfaces/ITrack";

export default interface ITrackBlockProps {
    track: ITrack
    addTrackHistory: MouseEventHandler<HTMLButtonElement>
    playTrackOnYoutube: MouseEventHandler<HTMLButtonElement>
}