import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AppDispatch, AppState, useAppDispatch } from '../../store/store';
import styles from './TrackForm.module.css'
import ITrackDto from '../../interfaces/ITrackDto';
import { shallowEqual, useSelector } from 'react-redux';
import Preloader from '../../components/UI/Preloader/Preloader';
import { Box, Button, FormControl, InputLabel, Modal, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IAlbum from '../../interfaces/IAlbum';
import MenuItem from '@mui/material/MenuItem';
import { getAlbums } from '../../store/albums/albums.slice';

const modalStyles = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    color: 'black',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '5px'
};

const TrackForm: React.FunctionComponent = (): React.ReactElement => {
    
    const {tracksLoading} = useSelector((state: AppState) => state.tracks, shallowEqual)

    const {isAuth} = useSelector((state: AppState) => state.users, shallowEqual)

    const {albumsList} = useSelector((state: AppState) => state.albums, shallowEqual)

    const dispatch: AppDispatch = useAppDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState<boolean>(false);

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true) 

    const [trackDto, setTrackDto] = useState<ITrackDto>({
        title: '',
        album: '',
        length: 0,
        link: undefined
    })

    const [albumName, setAlbumName] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setTrackDto(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const checkButton = (): void => {
        if(trackDto.title.trim() === '' || trackDto.album.trim() === '' || trackDto.length <= 0){
            setButtonDisabled(true)
        } else{
            setButtonDisabled(false)
        }
    }

    const submitHandler = (e: FormEvent): void => {
        e.preventDefault()
    }

    const handleAlbumChange = (event: SelectChangeEvent) => {
        const albumId: string | undefined = albumsList.find((album: IAlbum) => album.title === event.target.value)?._id
        if (albumId) {
            setTrackDto(prevState => {
                return {...prevState, album: albumId}
            })
        }
    }

    const handleClose = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        if (!albumsList.length) dispatch(getAlbums())
    }, [dispatch])

    useEffect(() => {
        if (!isAuth) navigate('/')
    }, [])

    useEffect(() => {
        checkButton()
    }, [trackDto])

    return (
        <div>
            {
                tracksLoading ? <Preloader/> : null
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...modalStyles, width: 200 }}>
                    <h2 id="child-modal-title">Request was send</h2>
                    <p id="child-modal-description">
                        Wait till admin approve it
                    </p>
                    <Button onClick={handleClose}>CLOSE</Button>
                </Box>
            </Modal>
            <h1>Add new track</h1>
            <form
                onSubmit={submitHandler}
                style={{margin: '10px', padding: '20px', background: '#e0e0e0', borderRadius: '5px', display: 'flex', flexDirection: 'column'}}
            >
                <TextField 
                        label="Track title" 
                        variant="outlined" 
                        style={{marginBottom: '20px'}}
                        value={trackDto.title}
                        name='title'
                        onChange={inputHandler}
                        autoComplete='off'
                />
                <FormControl>
                <InputLabel id="demo-simple-select-label">Albums</InputLabel>
                <Select
                    color='primary'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={albumName}
                    label="Choose album"
                    onChange={handleAlbumChange}
                    style={{marginBottom: '20px'}}
                >
                {
                    albumsList.length && albumsList.map((album: IAlbum, i: number) => {
                        return <MenuItem key={i} value={album.title}>{album.title}</MenuItem>
                    })
                }
                </Select>
                </FormControl>
                <TextField 
                        label="Track length" 
                        variant="outlined" 
                        style={{marginBottom: '20px'}}
                        value={trackDto.length}
                        name='length'
                        onChange={inputHandler}
                        autoComplete='off'
                        type='number'
                />
                <TextField 
                        label="Track link" 
                        variant="outlined" 
                        style={{marginBottom: '20px'}}
                        value={trackDto.link}
                        name='link'
                        onChange={inputHandler}
                        autoComplete='off'
                        type='url'
                />
                <button 
                    disabled={buttonDisabled}   
                className={styles.add_btn}>SEND</button>
            </form>
        </div>
    )
}

export default TrackForm