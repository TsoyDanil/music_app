import ITrackHistoryBlockProps from "./ITrackHistoryBlockProps";
import styles from './TrackHistoryBlock.module.css'

const TrackHistoryBlock: React.FunctionComponent<ITrackHistoryBlockProps> = (props): React.ReactElement => {
    
    return(
        <div className={styles.TrackHistoryBlock}>
            <p>{props.trackHistory?.track?.title !== undefined ? props.trackHistory?.track?.title : 'Track data was deleted'}</p>
            <p>{props.trackHistory?.track?.album?.artist?.name !== undefined ? props.trackHistory.track.album.artist.name :'Track\'s album was deleted'}</p>
            <p>{new Date(props.trackHistory?.datetime).toLocaleString()}</p>
        </div>
    )
}

export default TrackHistoryBlock