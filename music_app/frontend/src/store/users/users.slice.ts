import { createSlice } from "@reduxjs/toolkit"
import { usersApi } from "../../api/userApi"
import {trackHistoriesApi } from '../../api/trackHistoriesApi'
import { EStatuses } from "../../enum/EStatuses"
import IUser from "../../interfaces/IUser"
import IUserDto from "../../interfaces/IUserDto"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import IUsersState from "./IUsersState"

const namespace: string = 'users'

export const loginUser = createAppAsyncThunk(
    `${namespace}/loginUser`,
    async (user: IUserDto) => {
        return usersApi.loginUser(user)
    }
)

export const addUser = createAppAsyncThunk(
    `${namespace}/addUser`,
    async (user: IUserDto) => {
        return await usersApi.addUser(user)
    }
)

export const checkToken = createAppAsyncThunk(
    `${namespace}/checkToken`,
    async () => {
        return usersApi.checkToken()
    }
)

export const getTrackHistoryByToken = createAppAsyncThunk(
    `${namespace}/getTrackHistoryByToken`,
    async () => {
        return await trackHistoriesApi.getTrackHistoryByToken()
    }
)

const initialState: IUsersState = {
    user: {} as IUser,
    isAuth: false,
    loadingUser: false,
    messageUser: '',
    showAuthorizeForm: false,
    trackHistoryList: []
}

export const usersSlice = createSlice({
    name: namespace,
    initialState: initialState,
    reducers: {
        setToInitState(state){
            state.isAuth = false
            state.user = {} as IUser
            state.loadingUser = false
            state.messageUser = ''
        },
        startAuthorize(state){
            state.showAuthorizeForm = true
            state.messageUser = ''
        },
        cancelAuthorize(state){
            state.showAuthorizeForm = false
            state.messageUser = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loadingUser = true
        })
        .addCase(loginUser.rejected, (state) => {
            state.loadingUser = false
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loadingUser = false
            const user = action.payload.result
            state.user = user
            if (action.payload.status === EStatuses.FAILURE){
                state.messageUser = action.payload.message
            }
            if (user){
                localStorage.setItem('token', user.token)
                state.isAuth = true
                state.showAuthorizeForm = false
            }
        })
        .addCase(addUser.pending, (state) => {
            state.loadingUser = true
        })
        .addCase(addUser.rejected, (state) => {
            state.loadingUser = false
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loadingUser = false
            const user = action.payload.result
            state.user = user
            if (action.payload.status === EStatuses.FAILURE){
                state.messageUser = action.payload.message
            }
            if (user){
                localStorage.setItem('token', user.token)
                state.isAuth = true
                state.showAuthorizeForm = false
            }
        })
        .addCase(checkToken.pending, (state) => {
            state.loadingUser = true
        })
        .addCase(checkToken.rejected, (state) => {
            state.loadingUser = false
        })
        .addCase(checkToken.fulfilled, (state, action) => {
            state.loadingUser = false
            const user = action.payload.result
            state.user = user
            state.messageUser = action.payload.message
            if (user) {
                state.isAuth = true
            } else {
                state.isAuth = false
            }
        })
        .addCase(getTrackHistoryByToken.pending, (state) => {
            state.loadingUser = true
        })
        .addCase(getTrackHistoryByToken.rejected, (state) => {
            state.loadingUser = false
        })
        .addCase(getTrackHistoryByToken.fulfilled, (state, action) => {
            state.loadingUser = false
            if (action.payload.result) state.trackHistoryList = action.payload.result
        })
    }
})

export const {setToInitState, startAuthorize, cancelAuthorize} = usersSlice.actions