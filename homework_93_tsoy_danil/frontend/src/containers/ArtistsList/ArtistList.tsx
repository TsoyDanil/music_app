import { useEffect } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ArtistBlock from "../../components/ArtistBlock/ArtistBlock"
import Preloader from "../../components/UI/Preloader/Preloader"
import IArtist from "../../interfaces/IArtist"
import { getArtists } from "../../store/artists/artists.slice"
import { AppState, useAppDispatch } from "../../store/store"
import styles from './ArtistList.module.css'

const ArtistList: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {artistsList, artistsLoading} = useSelector((state: AppState) => state.artists, shallowEqual)

    const searchAlbumsHandler = (id: string) => {
        navigate({pathname: '/artists/' + id})
    }

    useEffect(() => {
        dispatch(getArtists())
    }, [])

    return(
        <div className={styles.ArtistList}>
            {
                artistsLoading ? <Preloader/> : null
            }
            {
                artistsList.length ? 
                artistsList.map((artist: IArtist) => {
                    return <ArtistBlock
                                key={artist._id}
                                artist={artist}
                                searchAlbums={() => {searchAlbumsHandler(artist._id)}}
                            /> 
                }) : 
                <h1>No artists yet</h1>
            }
        </div>
    )
}

export default ArtistList