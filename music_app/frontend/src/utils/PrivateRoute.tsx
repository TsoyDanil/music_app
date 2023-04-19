import { useEffect } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AppDispatch, AppState, useAppDispatch } from "../store/store"
import { checkToken } from "../store/users/users.slice"


const PrivateRoute: React.FunctionComponent = ():React.ReactElement => {

    const {isAuth} = useSelector((state: AppState) => state.users, shallowEqual)

    const location = useLocation()

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkToken())
    }, [])

    return(
        isAuth
        ?
            <Outlet/>
        : 
            <Navigate to='/' replace state={{from: location}} />
    )
}

export default PrivateRoute