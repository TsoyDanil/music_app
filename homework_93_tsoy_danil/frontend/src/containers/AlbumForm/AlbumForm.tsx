import { shallowEqual, useSelector } from 'react-redux'
import { AppDispatch, AppState, useAppDispatch } from '../../store/store'
import styles from './AlbumForm.module.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { getArtists } from '../../store/artists/artists.slice'
import { Button, FormControl, InputLabel, Select, SelectChangeEvent, TextField } from '@mui/material'
import IArtist from '../../interfaces/IArtist'
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IAlbumDto from '../../interfaces/IAlbumDto';
import { addAlbum } from '../../store/albums/albums.slice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

const AlbumForm: React.FunctionComponent = (): React.ReactElement => {

    const dispatch: AppDispatch = useAppDispatch()

    const [open, setOpen] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true) 

    const {artistsList} = useSelector((state: AppState) => state.artists, shallowEqual)

    const navigate = useNavigate()

    const {isAuth} = useSelector((state: AppState) => state.users, shallowEqual)

    const [artistName, setArtistName] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setArtistName(event.target.value as string);
    };

    const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(new Date()));

    const [albumDto, setAlbumDto] = useState<IAlbumDto>({
        title: '',
        artist: '',
        coverImage: undefined,
        releaseYear: dateValue !== null ? dateValue.toDate(): new Date()
    })

    const handleClose = () => {
        setOpen(false);
    };

    const [fileName, setFileName] = useState<string>('')

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setAlbumDto(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setAlbumDto(prevState => {
            return {...prevState, 
                coverImage: e.target.files ? e.target.files[0] : undefined}
        })
        setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : '')
    }

    const handleAlbumDtoChange = () => {
        const artistId: string | undefined =  artistsList.find((artist: IArtist) => artist.name === artistName)?._id
        if (artistId && dateValue){
            setAlbumDto(prevState => {
                return {...prevState, artist: artistId, releaseYear: dateValue.toDate()}
            })
        }
    }

    const checkButton = () => {
        if(albumDto.title.trim() === '' || albumDto.artist.trim() === '' || !albumDto.releaseYear || !albumDto.coverImage){
            setButtonDisabled(true)
        } else{
            setButtonDisabled(false)
        }
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(albumDto).forEach((key: string) => {
            //@ts-ignore
            formData.append(key, albumDto[key])
        })
        dispatch(addAlbum(formData))
        setAlbumDto({
            title: '',
            artist: '',
            coverImage: undefined,
            releaseYear: dateValue !== null ? dateValue.toDate(): new Date()
        })
        setFileName('')
        setOpen(true)
    }

    useEffect(() => {
        if (!artistsList.length) dispatch(getArtists())
    }, [dispatch])

    useEffect(() => {
        if (!isAuth) navigate('/')
    }, [])

    useEffect(() => {
        handleAlbumDtoChange()
    }, [dateValue, artistName])

    useEffect(() => {
        checkButton()
    },[albumDto])

    return(
        <div>
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
            <h1>Add new album</h1>
            <form 
                onSubmit={submitHandler}
                style={{margin: '10px', padding: '10px', background: '#e0e0e0', borderRadius: '5px'}}
            >
                <p style={{color: 'black'}}>Choose artist:</p>
                <TextField 
                    id="outlined-basic" 
                    label="Album title" 
                    variant="outlined" 
                    style={{marginBottom: '20px'}}
                    value={albumDto.title}
                    name='title'
                    onChange={inputHandler}
                />
                <FormControl sx={{ minWidth: 120 }} color='primary' fullWidth style={{marginBottom: '20px'}}>
                <InputLabel id="demo-simple-select-label">Artist</InputLabel>
                <Select
                    color='primary'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={artistName}
                    label="Age"
                    onChange={handleChange}
                >
                {
                    artistsList.length && artistsList.map((artist: IArtist, i: number) => {
                        return <MenuItem key={i} value={artist.name}>{artist.name}</MenuItem>
                    })
                }
                </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Controlled picker"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                />
                </LocalizationProvider>
                <label style={{display: 'flex', flexDirection: 'column'}}>
                    <input
                        style={{opacity: "0"}}
                        name={'coverImage'}
                        type="file"
                        placeholder="Image"
                        accept=".png, .jpg, .jpeg"
                        onChange={inputFileHandler}
                    />
                    <h1 className={styles.file_input}>
                        Choose file
                    </h1>
                    <span className={styles.filename}>{fileName}</span>
                </label>
                <button 
                    disabled={buttonDisabled}   
                className={styles.add_btn}>SEND</button>
            </form>
        </div>
    )
}

export default AlbumForm