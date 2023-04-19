import { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import TrackHistoryBlock from '../../components/TrackHistoryBlock/TrackHistoryBlock'
import Preloader from '../../components/UI/Preloader/Preloader'
import ITrackHistory from '../../interfaces/ITrackHistory'
import { AppDispatch, AppState, useAppDispatch } from '../../store/store'
import { getTrackHistoryByToken } from '../../store/users/users.slice'
import styles from './TrackHistory.module.css'

const TrackHistory: React.FunctionComponent = (): React.ReactElement => {

    const dispatch: AppDispatch = useAppDispatch()

    const {trackHistoryList, loadingUser} = useSelector((state: AppState) => state.users, shallowEqual)

    useEffect(() => {
        dispatch(getTrackHistoryByToken())
    }, [])

    return(
        <div>
            {
                loadingUser ?
                <Preloader/> : 
                null
            }
            <h2 style={{margin: 0}}>Track history:</h2>
            <main className={styles.TrackHistory_main}>
                {
                    trackHistoryList.length ? 
                    trackHistoryList.map((trackHistory: ITrackHistory) => {
                        return <TrackHistoryBlock
                                    key={trackHistory._id}
                                    trackHistory={trackHistory}
                                />
                    }) : <h1>History is empty</h1>
                }
            </main>
        </div>
    )
}

export default TrackHistory