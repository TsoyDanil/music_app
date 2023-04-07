import { createSlice } from "@reduxjs/toolkit"
import { tracksApi } from "../../api/tracksApi"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import ITracksState from "./ITracksState"


const namespace: string = 'tracks'

export const getTracksByAlbumId = createAppAsyncThunk(
    `${namespace}/getTracksByAlbumId`,
    async (id: string) => {
        return await tracksApi.getTracksByAlbumId(id)
    }
)

export const tracksSlice = createSlice({
    name: namespace,
    initialState: {
        tracksList: [],
        tracksLoading: false,
        tracksMessage: ''
    } as ITracksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getTracksByAlbumId.pending, (state) => {
            state.tracksLoading = true
        })
        .addCase(getTracksByAlbumId.rejected, (state) => {
            state.tracksLoading = false
        })
        .addCase(getTracksByAlbumId.fulfilled, (state, action) => {
            state.tracksLoading = false
            if (action.payload.result) state.tracksList = action.payload.result
        })
    }
})