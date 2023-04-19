import { EStatuses } from "../enum/EStatuses";

export default interface IResponse<T = null> {
    status: EStatuses
    result: T
    message: string
}