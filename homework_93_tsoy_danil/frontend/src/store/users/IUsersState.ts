import ITrackHistory from "../../interfaces/ITrackHistory";
import IUserGetDto from "../../interfaces/IUserGetDto";


export default interface IUsersState {
    user: IUserGetDto | null
    isAuth: boolean
    loadingUser: boolean
    messageUser: string
    showAuthorizeForm: boolean
    trackHistoryList: ITrackHistory[]
}