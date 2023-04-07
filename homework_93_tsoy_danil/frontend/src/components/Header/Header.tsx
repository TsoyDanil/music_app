
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AppDispatch, AppState, useAppDispatch } from "../../store/store"
import { setToInitState, startAuthorize } from "../../store/users/users.slice"
import AuthorizeForm from "../AuthorizeForm/AuthorizeForm"
import styles from './Header.module.css'
import { Button, ClickAwayListener, Grow } from "@mui/material"
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useRef, useState } from "react"
import { shallowEqual, useSelector } from "react-redux/es/exports"

const Header: React.FunctionComponent = (): React.ReactElement => {

    const {user, isAuth, showAuthorizeForm} = useSelector((state: AppState) => state.users, shallowEqual)

    const navigate = useNavigate()

    const dispatch: AppDispatch = useAppDispatch()

    const logoutHandler = () => {
        localStorage.removeItem('token')
        dispatch(setToInitState())
        navigate('/')
    }

    const handleListKeyDown = (event: React.KeyboardEvent): void => {
            if (event.key === 'Tab') {
                event.preventDefault();
                setOpen(false);
            } else if (event.key === 'Escape') {
                setOpen(false);
            }
        }

    const showAuthorizeFormHandler = () => {
        dispatch(startAuthorize())
    }

    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    
        const handleToggle = (): void => {
        setOpen((prevOpen) => !prevOpen);
        };
    
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
    
        setOpen(false);
        };

        const navigateToPage = (page: string): void => {
            setOpen(false)
            navigate(`${page}`)
        }

    return (
        <div>
            <header className={styles.Header}>
            <div className={styles.Header_inner_container}>
                <div className={styles.LinksBlock}>
                    <NavLink to={'/'}>
                        Home
                    </NavLink>
                    {
                        isAuth  ?
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h4 style={{margin: 0, color: 'black', marginRight: '40px'}}><span style={{fontWeight: 'normal'}}>Hello,</span> {user?.username}</h4>
                            <Button
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                            Navigate menu
                            </Button>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                            >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                                >
                                <Paper
                                    style={{position: 'relative', zIndex: 1000, fontWeight: 'bold'}}
                                >
                                    <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={()=>{navigateToPage('/add-artist')}}>Add artist</MenuItem>
                                        <MenuItem onClick={()=>{navigateToPage('/add-album')}}>Add album</MenuItem>
                                        <MenuItem onClick={()=>{navigateToPage('/add-track')}}>Add track</MenuItem>
                                        <MenuItem onClick={()=>{navigateToPage('/track-history')}}>Track history</MenuItem>
                                    </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                                </Grow>
                            )}
                            </Popper>
                            <button className={styles.Header_button} onClick={logoutHandler}>Logout</button>
                        </div> :
                        <div>
                            <button className={styles.Header_button} onClick={showAuthorizeFormHandler}>Login</button>
                        </div>
                    }
                </div>
            </div>
            </header>
            {
                showAuthorizeForm ? 
                <AuthorizeForm/> : 
                null
            }
        </div>
    )
}

export default Header