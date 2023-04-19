import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './ArtistForm.module.css'
import IArtistDto from '../../interfaces/IArtistDto';
import { AppDispatch, AppState, useAppDispatch } from '../../store/store';
import { addArtist } from '../../store/artists/artists.slice';
import { shallowEqual, useSelector } from 'react-redux';
import Preloader from '../../components/UI/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';

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

const ArtistForm: React.FunctionComponent = (): React.ReactElement => {
        
    const navigate = useNavigate()

    const {isAuth} = useSelector((state: AppState) => state.users, shallowEqual)

    const {artistsLoading} = useSelector((state: AppState) => state.artists, shallowEqual)
    
    const [open, setOpen] = useState<boolean>(false);

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true) 

    const [fileName, setFileName] = useState<string>('')

    const dispatch: AppDispatch = useAppDispatch()

    const handleClose = () => {
        setOpen(false);
    };

    const [artistDto, setArtistDto] = useState<IArtistDto>({
        name: '',
        information: '',
        photo: undefined
    })

    const checkButton = () => {
        if(artistDto.name.trim() === '' || artistDto.information.trim() === '' || !artistDto.photo){
            setButtonDisabled(true)
        } else{
            setButtonDisabled(false)
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setArtistDto(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setArtistDto(prevState => {
            return {...prevState, 
                photo: e.target.files ? e.target.files[0] : undefined}
        })
        setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : '')
    }

    const submitHandler = (e: FormEvent): void => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(artistDto).forEach((key: string) => {
            //@ts-ignore
            formData.append(key, artistDto[key])
        })
        dispatch(addArtist(formData))
        setArtistDto({
            name: '',
            information: '',
            photo: undefined
        })
        setFileName('')
        setOpen(true)
    }

    useEffect(() => {
        checkButton()
    }, [artistDto])

    useEffect(() => {
        if (!isAuth) navigate('/')
    }, [])

    return (
        <div
        >
            {
                artistsLoading ? <Preloader/> : null
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
            <h1>Add new artist</h1>
            <form
                onSubmit={submitHandler}
                style={{margin: '10px', padding: '20px', background: '#e0e0e0', borderRadius: '5px', display: 'flex', flexDirection: 'column'}}
            >
            <TextField 
                id="outlined-basic" 
                label="Artist name" 
                variant="outlined" 
                style={{marginBottom: '20px'}}
                value={artistDto.name}
                name='name'
                onChange={inputHandler}
                autoComplete='off'
            />
            <TextField 
                id="outlined-basic" 
                label="Artist info" 
                variant="outlined" 
                style={{marginBottom: '20px'}}
                value={artistDto.information}
                name='information'
                onChange={inputHandler}
                autoComplete='off'
            />
            <label style={{maxWidth: '30%', display: 'flex', flexDirection: 'column'}}>
                <input
                    style={{opacity: "0"}}
                    name={'photo'}
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

export default ArtistForm