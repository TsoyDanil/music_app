import { shallowEqual, useSelector } from "react-redux"
import { AppDispatch, AppState, useAppDispatch } from "../store/store"
import { checkToken } from "../store/users/users.slice"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"



const PermissionRoute: React.FunctionComponent<{roles:string[]}> = ({roles}): React.ReactElement => {
    const {isAuth, user} = useSelector((state: AppState) => state.users, shallowEqual)
    const dispatch: AppDispatch = useAppDispatch()
    useEffect(() => {
        dispatch(checkToken())
    }, [])
    return (
        isAuth && user?.role && roles.includes(user?.role)
        ? 
            <Outlet />
        :
            <Navigate to='/' replace/>
    )
}

export default PermissionRoute