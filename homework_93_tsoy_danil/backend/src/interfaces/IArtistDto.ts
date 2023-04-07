import IArtist from "./IArtist";

export default interface IArtistDto {
    name: IArtist['name']
    photo: File
    information: IArtist['information']
}