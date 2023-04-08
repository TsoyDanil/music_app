import ITrack from "../../interfaces/ITrack";

export default interface ITracksState {
    tracksList: ITrack[] 
    unpublishedTracks: ITrack[]
    tracksLoading: boolean
    tracksMessage: string
}