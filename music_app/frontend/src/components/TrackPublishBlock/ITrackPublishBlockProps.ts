import { MouseEventHandler } from "react";
import ITrack from "../../interfaces/ITrack";

export default interface ITrackPublishBlockProps {
    track: ITrack
    publishTrack: MouseEventHandler<HTMLButtonElement>
    deleteTrack: MouseEventHandler<HTMLButtonElement>
}