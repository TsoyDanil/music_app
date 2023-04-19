import IArtist from "../../interfaces/IArtist";

export default interface IArtistsState {
    targetedArtist: IArtist | null
    artistsList: IArtist[]
    unpublishedArtists: IArtist[]
    artistsLoading: boolean
    artistsMessage: string
}