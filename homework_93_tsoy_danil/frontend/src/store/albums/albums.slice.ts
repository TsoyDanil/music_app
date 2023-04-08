import { createSlice } from "@reduxjs/toolkit"
import { albumsApi } from "../../api/albumsApi"
import IAlbum from "../../interfaces/IAlbum"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import IAlbumsState from "./IAlbumsState"
import IAlbumDto from "../../interfaces/IAlbumDto"


const namespace: string = 'albums'

export const getAlbumsByArtistId = createAppAsyncThunk(
    `${namespace}/getAlbumsByArtistId`,
    async (id: string)=> {
        return await albumsApi.getAlbumsByArtistId(id)
    }
)

export const getUnpublishedAlbums = createAppAsyncThunk(
    `${namespace}/getUnpublishedAlbums`,
    async () => {
        return await albumsApi.getUnpublishedAlbums()
    }
)

export const addAlbum = createAppAsyncThunk(
    `${namespace}/addAlbum`,
    async (albumDto: FormData) => {
        return await albumsApi.addAlbum(albumDto)
    }
)

export const albumsSlice = createSlice({
    name: namespace,
    initialState: {
        targetedAlbum: null,
        albumsList: [],
        unpublishedAlbums: [],
        albumsLoading: false,
        albumsMessage: ''
    } as IAlbumsState,
    reducers:{
        setTargetedAlbum : (state, action) => {
            const albumId = action.payload
            const targetedAlbum = state.albumsList.find((album: IAlbum) => {
                return album._id === albumId
            })
            if (targetedAlbum){
                state.targetedAlbum = targetedAlbum
            } else {
                state.targetedAlbum = null
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAlbumsByArtistId.pending, (state) => {
            state.albumsLoading = true
        })
        .addCase(getAlbumsByArtistId.rejected, (state) => {
            state.albumsLoading = false
        })
        .addCase(getAlbumsByArtistId.fulfilled, (state, action) => {
            state.albumsLoading = false
            if (action.payload.result) state.albumsList = action.payload.result
        })

        .addCase(getUnpublishedAlbums.pending, (state) => {
            state.albumsLoading = true
        })
        .addCase(getUnpublishedAlbums.rejected, (state) => {
            state.albumsLoading = true
        })
        .addCase(getUnpublishedAlbums.fulfilled, (state, action) => {
            state.albumsLoading = true
            if (action.payload.result) state.unpublishedAlbums = action.payload.result
        })

        .addCase(addAlbum.pending, (state) => {
            state.albumsLoading = true
        })
        .addCase(addAlbum.rejected, (state) => {
            state.albumsLoading = false
        })
        .addCase(addAlbum.fulfilled, (state, action) => {
            state.albumsLoading = false
            if (action.payload.result) state.unpublishedAlbums = state.unpublishedAlbums.concat(action.payload.result)
        })

        
    }
})

export const {
    setTargetedAlbum
} = albumsSlice.actions