import { useEffect, useState } from 'react'
import styles from './AdminArea.module.css'
import { AppDispatch, AppState, useAppDispatch } from '../../store/store'
import { getAlbums, getUnpublishedAlbums } from '../../store/albums/albums.slice'
import { getArtists, getUnpublishedArtists } from '../../store/artists/artists.slice'
import { getTracks, getUnpublishedTracks } from '../../store/tracks/tracks.slice'
import { shallowEqual, useSelector } from 'react-redux'
import Preloader from '../../components/UI/Preloader/Preloader'
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material'
import ITrack from '../../interfaces/ITrack'
import IArtist from '../../interfaces/IArtist'
import IAlbum from '../../interfaces/IAlbum'
import TrackPublishBlock from '../../components/TrackPublishBlock/TrackPublishBlock'
import ArtistPublishBlock from '../../components/ArtistPublishBlock/ArtistPublishBlock'
import AlbumPublishBlock from '../../components/AlbumPublishBlock/AlbumPublishBlock'

const AdminArea: React.FunctionComponent = (): React.ReactElement => {

    const {albumsLoading, unpublishedAlbums} = useSelector((state: AppState) => state.albums, shallowEqual)

    const {tracksLoading, unpublishedTracks} = useSelector((state: AppState) => state.tracks, shallowEqual)

    const {artistsLoading, unpublishedArtists} = useSelector((state: AppState) => state.artists, shallowEqual)

    const [selectValue, setSelectValue] = useState<string>('')

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    };

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUnpublishedAlbums())
        dispatch(getUnpublishedArtists())
        dispatch(getUnpublishedTracks())
    }, [])

    const deleteTrackHandler = (id: string) => {
        console.log(id);
    }

    const publishTrackHandler = (id: string) => {
        console.log(dispatch);
    }

    const deleteArtistHandler = (id: string) => {
        console.log(id)
    }

    const publishArtistHandler = (id: string) => {
        console.log(id);
    }

    const deleteAlbumHandler = (id: string) => {
        console.log(id)
    }

    const publishAlbumHandler = (id: string) => {
        console.log(id);
    }

    return(
        <div>
            {
                albumsLoading || artistsLoading || tracksLoading ? <Preloader/> : null
            }
            <h1>Admin area</h1>
            <div 
                style={{margin: '10px', padding: '20px', background: '#e0e0e0', borderRadius: '5px'}}
            >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">What to show...</InputLabel>
                    <Select
                        color='primary'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectValue}
                        label="Choose album"
                        onChange={handleChangeSelect}
                        style={{marginBottom: '20px'}}
                    >
                    <MenuItem value={'artists'}>Artists</MenuItem>
                    <MenuItem value={'albums'}>Albums</MenuItem>
                    <MenuItem value={'tracks'}>Tracks</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.DataArea}>
                    {
                        selectValue === 'tracks' && unpublishedTracks.length && unpublishedTracks.map((track: ITrack) => {
                                return <TrackPublishBlock
                                        key={track._id}
                                        track={track}
                                        publishTrack={()=>{publishTrackHandler(track._id)}}
                                        deleteTrack={()=>{deleteTrackHandler(track._id)}}
                                    /> 
                        })
                    }
                    {
                        selectValue === 'artists' && unpublishedArtists.length && unpublishedArtists.map((artist: IArtist) => {
                                return <ArtistPublishBlock
                                            key={artist._id}
                                            artist={artist}
                                            publishArtist={()=>{publishArtistHandler(artist._id)}}
                                            deleteArtist={()=>{deleteArtistHandler(artist._id)}}
                                        />
                        })
                    }
                    {
                        selectValue === 'albums' && unpublishedAlbums.length && unpublishedAlbums.map((album: IAlbum) => {
                                return <AlbumPublishBlock
                                            key={album._id}
                                            album={album}
                                            publishAlbum={()=>{publishAlbumHandler(album._id)}}
                                            deleteAlbum={()=>{deleteAlbumHandler(album._id)}}
                                        />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminArea