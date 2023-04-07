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

export const artistsSlice = createSlice({
    name: namespace,
    initialState:{
        targetedArtist: null,
        artistsList: [],
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
        .addCase(getArtists.rejected, (state, action) => {
            state.artistsLoading = false
        })
        .addCase(getArtists.fulfilled, (state, action) => {
            state.artistsLoading = false
            if (action.payload.result) state.artistsList = action.payload.result
        })
    }
})

export const {
    setTargetedArtist
} = artistsSlice.actions