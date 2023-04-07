import styles from './Preloader.module.css'

const Preloader: React.FunctionComponent = (): React.ReactElement => {
    return(
        <div className={styles.Preloader_backdrop}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Preloader