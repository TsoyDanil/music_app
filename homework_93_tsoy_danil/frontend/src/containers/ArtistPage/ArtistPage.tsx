import { useEffect } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import AlbumBlock from "../../components/AlbumBlock/AlbumBlock"
import Preloader from "../../components/UI/Preloader/Preloader"
import IAlbum from "../../interfaces/IAlbum"
import { getAlbumsByArtistId } from "../../store/albums/albums.slice"
import { getArtists, setTargetedArtist } from "../../store/artists/artists.slice"
import { AppState, useAppDispatch } from "../../store/store"
import styles from './ArtistPage.module.css'

const ArtistPage: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const params = useParams()
    
    const {artistsList} = useSelector((state: AppState) => state.artists, shallowEqual)

    const {targetedArtist} = useSelector((state: AppState) => state.artists, shallowEqual)

    const {albumsList, albumsLoading} = useSelector((state: AppState) => state.albums, shallowEqual)

    const getFullData = async () => {
        if (artistsList.length === 0){
            await dispatch(getArtists())
        }
        if (params.id){
            await dispatch(getAlbumsByArtistId(params.id))
            dispatch(setTargetedArtist(params.id))
        }
    }

    
    const searchAlbumTracksHandler = (id: string) => {
        navigate({pathname: '/artists/' + params.id + '/' + id})
    }

    useEffect(() => {
        getFullData()
    }, [])

    return(
        <div>
            {
                albumsLoading ? <Preloader/> : null
            }
            {
                targetedArtist ?
                <div>  
                    <h1 className={styles.ArtistPage_header}>{targetedArtist.name}</h1>
                </div> 
                : <h1>No artist Found</h1>
            }
            {
                targetedArtist ? 
                    <div className={styles.AlbumsList}>
                        {
                            albumsList.length ? albumsList.map((album: IAlbum) => {
                                return <AlbumBlock
                                            key={album._id}
                                            album={album}
                                            searchTracks={() => {searchAlbumTracksHandler(album._id)}}
                                        />
                                }) : <h1 style={{textAlign: 'center'}}>Empty</h1>
                        }
                    </div>
                : null
            }
        </div>
    )
}

export default ArtistPage