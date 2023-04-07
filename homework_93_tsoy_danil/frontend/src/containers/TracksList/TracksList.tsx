import { useEffect, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { trackHistoriesApi } from "../../api/trackHistoriesApi"
import TrackBlock from "../../components/TrackBlock/TrackBlock"
import Preloader from "../../components/UI/Preloader/Preloader"
import ITrack from "../../interfaces/ITrack"
import ITrackHistoryDto from "../../interfaces/ITrackHistoryDto"
import { getAlbumsByArtistId, setTargetedAlbum } from "../../store/albums/albums.slice"
import { getArtists, setTargetedArtist } from "../../store/artists/artists.slice"
import { AppState, useAppDispatch } from "../../store/store"
import { getTracksByAlbumId } from "../../store/tracks/tracks.slice"
import styles from './TracksList.module.css'

const TracksList: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const {artistsList, targetedArtist} = useSelector((state: AppState) => state.artists, shallowEqual)

    const {targetedAlbum} = useSelector((state: AppState) => state.albums, shallowEqual)

    const {tracksList, tracksLoading} = useSelector((state: AppState) => state.tracks, shallowEqual)

    const {isAuth} = useSelector((state: AppState) => state.users, shallowEqual)

    const params = useParams()

    const [showPlayer, setShowPlayer] = useState<boolean>(false)

    const [trackLink, setTrackLink] = useState<string>('')

    const getFullData = async () => {
        if (artistsList.length === 0){
            await dispatch(getArtists())
        }
        if (params.id){
            await dispatch(getAlbumsByArtistId(params.id))
            dispatch(setTargetedArtist(params.id))
        }
        if (params.album_id){
            dispatch(setTargetedAlbum(params.album_id))
            await dispatch(getTracksByAlbumId(params.album_id))
        }
    }

    const addTrackHistoryHandler = (id: string) => {
        if (!isAuth) return
        const trackHistoryDto: ITrackHistoryDto = {
            track: id
        }
        trackHistoriesApi.addTrackHistory(trackHistoryDto)
    }

    const playTrackOnYoutube = (link: string) => {
        console.log(link);
        setTrackLink(link)
        setShowPlayer(true)
    }

    const closePlayer = () => {
        setShowPlayer(false)
    }

    useEffect(() => {
        getFullData()
    }, [])

    return (
        <>
            {
                showPlayer ? 
                <div className={styles.Video_frame}>
                    <iframe 
                        width="560" 
                        height="315" 
                        src={trackLink}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen={true}
                        className={styles.Video_frame_player}
                    >
                    </iframe>
                    <button 
                        className={styles.Close_button}
                        onClick={closePlayer}
                    ></button>
                </div>:
                    null
            }
            {
                tracksLoading ? <Preloader/> : null
            }
            {
                targetedArtist && targetedAlbum ?
                <div className={styles.TracksList}>
                    <h1 className={styles.TracksList_header}>{targetedArtist.name}</h1>
                    <p>{targetedAlbum.title}</p>
                    {
                        tracksList.length ? 
                        tracksList.map((track: ITrack) => {
                            return <TrackBlock
                                        key={track._id}
                                        track={track}
                                        addTrackHistory={()=>{addTrackHistoryHandler(track._id)}}
                                        playTrackOnYoutube={() => {playTrackOnYoutube(track?.link)}}
                                    />
                        }) : <h1>No Tracks Yet</h1>
                    }
                </div> : <h1>No data Found</h1>
            }
        </>
    )
}

export default TracksList