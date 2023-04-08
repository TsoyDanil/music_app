import { useEffect } from 'react'
import styles from './AdminArea.module.css'
import { AppDispatch, AppState, useAppDispatch } from '../../store/store'
import { getUnpublishedAlbums } from '../../store/albums/albums.slice'
import { getUnpublishedArtists } from '../../store/artists/artists.slice'
import { getUnpublishedTracks } from '../../store/tracks/tracks.slice'
import { shallowEqual, useSelector } from 'react-redux'
import Preloader from '../../components/UI/Preloader/Preloader'

const AdminArea: React.FunctionComponent = (): React.ReactElement => {

    const {albumsLoading} = useSelector((state: AppState) => state.albums, shallowEqual)

    const {tracksLoading} = useSelector((state: AppState) => state.tracks, shallowEqual)

    const {artistsLoading} = useSelector((state: AppState) => state.artists, shallowEqual)

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        async () => {
            await dispatch(getUnpublishedAlbums())
            await dispatch(getUnpublishedArtists())
            await dispatch(getUnpublishedTracks())
        }
    }, [])

    return(
        <div>
            {
                albumsLoading || artistsLoading ? <Preloader/> : null
            }
            <h1>Admin area</h1>
        </div>
    )
}

export default AdminArea