import { createSlice } from "@reduxjs/toolkit"
import { tracksApi } from "../../api/tracksApi"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import ITracksState from "./ITracksState"
import ITrackDto from "../../interfaces/ITrackDto"
import ITrack from "../../interfaces/ITrack"


const namespace: string = 'tracks'

export const getTracks = createAppAsyncThunk(
    `${namespace}/getTracks`,
    async () => {
        return await tracksApi.getTracks()
    }
)

export const getTracksByAlbumId = createAppAsyncThunk(
    `${namespace}/getTracksByAlbumId`,
    async (id: string) => {
        return await tracksApi.getTracksByAlbumId(id)
    }
)

export const addTrack = createAppAsyncThunk(
    `${namespace}/addTrack`,
    async (trackDto: ITrackDto) => {
        return await tracksApi.addTrack(trackDto)
    }
)

export const getUnpublishedTracks = createAppAsyncThunk(
    `${namespace}/getUnpublishedTracks`,
    async () => {
        return await tracksApi.getUnpublishedTracks()
    }
)

export const deleteTrackById = createAppAsyncThunk(
    `${namespace}/deleteTrackById`,
    async (id: string) => {
        return await tracksApi.deleteTrackById(id)
    }
)

export const publishTrackById = createAppAsyncThunk(
    `${namespace}/publishTrackById`,
    async (id: string) => {
        return await tracksApi.publishTrackById(id)
    }
)

export const tracksSlice = createSlice({
    name: namespace,
    initialState: {
        tracksList: [],
        unpublishedTracks: [],
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

        .addCase(addTrack.pending, (state) => {
            state.tracksLoading = true
        })
        .addCase(addTrack.rejected, (state) => {
            state.tracksLoading = false
        })
        .addCase(addTrack.fulfilled, (state, action) => {
            state.tracksLoading = false
            if (action.payload.result) state.unpublishedTracks = state.unpublishedTracks.concat(action.payload.result)
        })

        .addCase(getUnpublishedTracks.pending, (state) => {
            state.tracksLoading = true
        })
        .addCase(getUnpublishedTracks.rejected, (state) => {
            state.tracksLoading = false
        })
        .addCase(getUnpublishedTracks.fulfilled, (state, action) => {
            state.tracksLoading = false
            if (action.payload.result) state.unpublishedTracks = action.payload.result
        })

        .addCase(getTracks.pending, (state) => {
            state.tracksLoading = true
        })
        .addCase(getTracks.rejected, (state) => {
            state.tracksLoading = false
        })
        .addCase(getTracks.fulfilled, (state, action) => {
            state.tracksLoading = false
            if (action.payload.result) state.tracksList = action.payload.result
        })

        .addCase(deleteTrackById.pending, (state) => {
            state.tracksLoading = true
        })
        .addCase(deleteTrackById.rejected, (state) => {
            state.tracksLoading = false
        })
        .addCase(deleteTrackById.fulfilled, (state, action) => {
            state.tracksLoading = false
            if (action.payload.result){
                state.tracksList = state.tracksList.filter((track: ITrack) => {
                    return track._id !== action.payload.result?._id
                })
            }
        })

        .addCase(publishTrackById.pending, (state) => {
            state.tracksLoading = true
        })
        .addCase(publishTrackById.rejected, (state) => {
            state.tracksLoading = false
        })
        .addCase(publishTrackById.fulfilled, (state, action) => {
            state.tracksLoading = false
            if (action.payload.result){
                const index: number = state.tracksList.findIndex((album: ITrack) => album._id === action.payload.result?._id)
                state.tracksList[index] = action.payload.result
            }
        })
    }
})