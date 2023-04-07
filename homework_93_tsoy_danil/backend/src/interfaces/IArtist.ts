import { Types } from "mongoose";


export default interface IArtist {
    _id: Types.ObjectId
    name: string;
    photo: string;
    information: string;
}