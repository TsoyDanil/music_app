import styles from './AuthorizeForm.module.css'
import { FormEvent, useEffect, useState } from 'react'
import IUserDto from '../../interfaces/IUserDto'
import { AppDispatch, AppState, useAppDispatch } from '../../store/store'
import { addUser, cancelAuthorize, loginUser } from '../../store/users/users.slice'
import { shallowEqual, useSelector } from 'react-redux'
import Preloader from '../UI/Preloader/Preloader'
import { FormControlLabel, Switch } from '@mui/material'

const AuthorizeForm: React.FunctionComponent = (): React.ReactElement => {

    const dispatch: AppDispatch = useAppDispatch()

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const {messageUser, loadingUser} = useSelector((state: AppState) => state.users, shallowEqual)

    const [isLoginUser, setIsLoginUser] = useState<boolean>(false)

    const [userValues, setUserValues] = useState<IUserDto>({
        username: '',
        password: ''
    })
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const toggleChangeHandler = () => {
        setIsLoginUser(!isLoginUser)
    }

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        if (isLoginUser){
            await dispatch(addUser(userValues))
        } else{
            await dispatch(loginUser(userValues))
        }
    }

    const cancelAuthorizeHandler = () => {
        dispatch(cancelAuthorize())
    }

    const checkButton = () => {
        if (userValues.username.trim() === '' || userValues.password.trim() === ''){
            setButtonDisabled(true)
        } else{
            setButtonDisabled(false)
        }
    }

    useEffect(() => {
        checkButton()
    },[userValues])

    return (
        <div className={styles.AuthorizeForm}>
            {
                loadingUser ?
                <Preloader/> : 
                null
            }
            <div className={styles.Inner_container}>
                <form className={styles.Form_authorize} onSubmit={submitHandler}>
                    <h1 style={{margin: 0, color: 'black'}}>{isLoginUser ? 'Add user' : 'Authorize user'}</h1>
                    <span style={{color: 'black'}}>{messageUser.trim() !== '' ? messageUser : ''}</span>
                    <p style={{color: 'black', margin: 0}}>Username:</p>
                    <input 
                        placeholder='Username...'
                        name='username'
                        autoComplete='off'
                        type={'text'}
                        value={userValues.username}
                        className={styles.AuthorizeForm_input}
                        onChange={inputHandler}
                    />
                    <p style={{color: 'black', margin: 0}}>Password:</p>
                    <input 
                        placeholder='Password...'
                        name='password'
                        autoComplete='off'
                        type={'password'}
                        value={userValues.password}
                        className={styles.AuthorizeForm_input}
                        onChange={inputHandler}
                    />
                    <FormControlLabel
                        
                        control={<Switch
                                checked={isLoginUser}
                                onChange={toggleChangeHandler}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />} 
                        label={<p style={{color: 'black'}}>Add new user</p>}
                    />
                    <button
                        disabled={buttonDisabled}
                    >Send</button>
                </form>
                <button className={styles.AuthorizeForm_button} onClick={cancelAuthorizeHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default AuthorizeForm