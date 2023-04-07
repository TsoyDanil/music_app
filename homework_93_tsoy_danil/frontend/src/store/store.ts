import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { albumsSlice } from "./albums/albums.slice"
import { artistsSlice } from "./artists/artists.slice"
import { tracksSlice } from "./tracks/tracks.slice"
import { usersSlice } from "./users/users.slice"

const makeStore = () => {
    return configureStore({
        reducer:{
            artists: artistsSlice.reducer,
            albums: albumsSlice.reducer,
            tracks: tracksSlice.reducer,
            users: usersSlice.reducer
        }
    })
}

const store = makeStore()
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store