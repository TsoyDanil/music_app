import { createSlice } from "@reduxjs/toolkit";
import { artistsApi } from "../../api/artistsApi";
import IArtist from "../../interfaces/IArtist";
import { createAppAsyncThunk } from "../createAppAsyncThunk";
import IArtistsState from "./IArtistsState";

const namespace: string = 'artists'

export const getArtists = createAppAsyncThunk(
    `${namespace}/getArtists`,
    async () => {
        return await artistsApi.getArtists()
    }
)

export const addArtist = createAppAsyncThunk(
    `${namespace}/addArtist`,
    async (artistDto: FormData) => {
        return await artistsApi.addArtist(artistDto)
    }
)

export const getUnpublishedArtists = createAppAsyncThunk(
    `${namespace}/getUnpublishedArtists`,
    async () => {
        return await artistsApi.getUnpublishedArtists()
    }
)

export const deleteArtistById = createAppAsyncThunk(
    `${namespace}/deleteArtistById`,
    async (id: string) => {
        return await artistsApi.deleteArtistById(id)
    }
)

export const publishArtistById = createAppAsyncThunk(
    `${namespace}/publishArtistById`,
    async (id: string) => {
        return await artistsApi.publishArtistById(id)
    }
)



export const artistsSlice = createSlice({
    name: namespace,
    initialState:{
        targetedArtist: null,
        artistsList: [],
        unpublishedArtists: [],
        artistsLoading: false,
        artistsMessage: ''
    } as IArtistsState,
    reducers:{
        setTargetedArtist: (state, action)=> {
            const artistId = action.payload
            const targetedArtist = state.artistsList.find((artist: IArtist) => {
                return artist._id === artistId
            })
            if (targetedArtist){
                state.targetedArtist = targetedArtist
            } else{
                state.targetedArtist = null
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getArtists.pending, (state) => {
            state.artistsLoading = true
        })
        .addCase(getArtists.rejected, (state) => {
            state.artistsLoading = false
        })
        .addCase(getArtists.fulfilled, (state, action) => {
            state.artistsLoading = false
            if (action.payload.result) state.artistsList = action.payload.result
        })

        .addCase(addArtist.pending, (state) => {
            state.artistsLoading = true
        })
        .addCase(addArtist.rejected, (state) => {
            state.artistsLoading = false
        })
        .addCase(addArtist.fulfilled, (state, action) => {
            state.artistsLoading = false
            if (action.payload.result) state.unpublishedArtists = state.unpublishedArtists.concat(action.payload.result)
        })

        .addCase(getUnpublishedArtists.pending, (state) => {
            state.artistsLoading = false
        })
        .addCase(getUnpublishedArtists.rejected, (state) => {
            state.artistsLoading = false
        })
        .addCase(getUnpublishedArtists.fulfilled, (state, action) => {
            state.artistsLoading = false
            if (action.payload.result) state.unpublishedArtists = action.payload.result
        })

        .addCase(deleteArtistById.pending, (state) => {
            state.artistsLoading = true
        })
        .addCase(deleteArtistById.rejected, (state) => {
            state.artistsLoading = false
        })
        .addCase(deleteArtistById.fulfilled, (state, action) => {
            state.artistsLoading = false
            if (action.payload.result){
                state.artistsList = state.artistsList.filter((artist: IArtist) => {
                    return artist._id !== action.payload.result?._id
                })
            }
        })

        .addCase(publishArtistById.pending, (state) => {
            state.artistsLoading = true
        })
        .addCase(publishArtistById.rejected, (state) => {
            state.artistsLoading = false
        })
        .addCase(publishArtistById.fulfilled, (state, action) => {
            state.artistsLoading = false
            if (action.payload.result){
                const index: number = state.artistsList.findIndex((album: IArtist) => album._id === action.payload.result?._id)
                state.artistsList[index] = action.payload.result
            }
        })
    }
})

export const {
    setTargetedArtist
} = artistsSlice.actions