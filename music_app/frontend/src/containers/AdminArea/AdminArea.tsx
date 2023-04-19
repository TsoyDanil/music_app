import { useEffect, useState } from 'react'
import styles from './AdminArea.module.css'
import { AppDispatch, AppState, useAppDispatch } from '../../store/store'
import { deleteAlbumById, getAlbums, publishAlbumById } from '../../store/albums/albums.slice'
import { deleteArtistById, getArtists, publishArtistById } from '../../store/artists/artists.slice'
import { deleteTrackById, getTracks, publishTrackById } from '../../store/tracks/tracks.slice'
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

    const {albumsLoading, albumsList} = useSelector((state: AppState) => state.albums, shallowEqual)

    const {tracksLoading, tracksList} = useSelector((state: AppState) => state.tracks, shallowEqual)

    const {artistsLoading, artistsList} = useSelector((state: AppState) => state.artists, shallowEqual)

    const [showPublished, setShowPublished] = useState<boolean>(false)

    const [selectValue, setSelectValue] = useState<string>('')

    const [dataType, setDataType] = useState<string>('')

    const handleShowDataSelect = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    };

    const handleShownDataType = (event: SelectChangeEvent) => {
        setDataType(event.target.value)
    }

    const dispatch: AppDispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getArtists())
        dispatch(getTracks())
    }, [])

    const deleteTrackHandler = (id: string) => {
        dispatch(deleteTrackById(id))
    }

    const publishTrackHandler = (id: string) => {
        dispatch(publishTrackById(id))
    }

    const deleteArtistHandler = (id: string) => {
        dispatch(deleteArtistById(id))
    }

    const publishArtistHandler = (id: string) => {
        dispatch(publishArtistById(id))
    }

    const deleteAlbumHandler = (id: string) => {
        dispatch(deleteAlbumById(id))
    }

    const publishAlbumHandler = (id: string) => {
        dispatch(publishAlbumById(id))
    }

    useEffect(() => {
        dataType === 'published' ? setShowPublished(true) : setShowPublished(false)
    }, [dataType])

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
                    <InputLabel id="shown-data-type-id">Data type...</InputLabel>
                    <Select
                        color='primary'
                        labelId="shown-data-type-id"
                        id="data-type-select-id"
                        value={dataType}
                        label="Choose album"
                        onChange={handleShownDataType}
                        style={{marginBottom: '20px'}}
                    >
                    <MenuItem value={'published'}>Published</MenuItem>
                    <MenuItem value={'unpublished'}>Unpublished</MenuItem>
                    </Select>
                </FormControl>

                {
                    dataType.trim() !== '' ? 
                        <FormControl fullWidth>
                            <InputLabel id="shown-data-id">What to show...</InputLabel>
                                <Select
                                    color='primary'
                                    labelId="shown-data-id"
                                    id="select-data-to-show-id"
                                    value={selectValue}
                                    label="Choose album"
                                    onChange={handleShowDataSelect}
                                    style={{marginBottom: '20px'}}
                                >
                                <MenuItem value={'artists'}>Artists</MenuItem>
                                <MenuItem value={'albums'}>Albums</MenuItem>
                                <MenuItem value={'tracks'}>Tracks</MenuItem>
                                </Select>
                        </FormControl> 
                    : null
                }

                <div className={styles.DataArea}>
                    {
                        selectValue === 'tracks' && tracksList.length && tracksList.map((track: ITrack) => {
                            if (track.isPublished === showPublished){
                                return <TrackPublishBlock
                                        key={track._id}
                                        track={track}
                                        publishTrack={()=>{publishTrackHandler(track._id)}}
                                        deleteTrack={()=>{deleteTrackHandler(track._id)}}
                                    />
                            }
                        })
                    }
                    {
                        selectValue === 'artists' && artistsList.length && artistsList.map((artist: IArtist) => {
                            if (artist.isPublished === showPublished){
                                return <ArtistPublishBlock
                                            key={artist._id}
                                            artist={artist}
                                            publishArtist={()=>{publishArtistHandler(artist._id)}}
                                            deleteArtist={()=>{deleteArtistHandler(artist._id)}}
                                        />
                            }
                        })
                    }
                    {
                        selectValue === 'albums' && albumsList.length && albumsList.map((album: IAlbum) => {
                            if (album.isPublished === showPublished){
                                return <AlbumPublishBlock
                                            key={album._id}
                                            album={album}
                                            publishAlbum={()=>{publishAlbumHandler(album._id)}}
                                            deleteAlbum={()=>{deleteAlbumHandler(album._id)}}
                                        />
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminArea