import ITrack from "../../interfaces/ITrack";

export default interface ITracksState {
    tracksList: ITrack[] 
    tracksLoading: boolean
    tracksMessage: string
}