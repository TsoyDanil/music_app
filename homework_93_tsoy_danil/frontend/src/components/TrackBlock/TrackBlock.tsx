import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "../../store/store";
import ITrackBlockProps from "./ITrackBlockProps";
import styles from './TrackBlock.module.css'

const TrackBlock: React.FunctionComponent<ITrackBlockProps> = (props): React.ReactElement => {

    const {isAuth} = useSelector((state: AppState) => state.users, shallowEqual)

    return (
        <div 
            className={styles.TrackBlock}
        >
            <div className={styles.Track_data}>
                <h1><span>{props.track.index}</span>{props.track.title}</h1>
                <p>Length: {Math.floor(props.track.length / 60)}:{props.track.length % 60 < 10 ? "0" : ""}{props.track.length % 60}</p>
            </div>
            {
                isAuth ?
                <button
                    onClick={props.addTrackHistory}
                >Add to history</button> :
                null
            }
            {
                props.track.link ? 
                <button
                    onClick={props.playTrackOnYoutube}
                >Play</button> : 
                null
            } 
        </div>
    )
}

export default TrackBlock