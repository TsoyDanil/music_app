import React from "react";
import IArtistBlockProps from "./IArtistBlockProps";
import styles from './ArtistBlock.module.css'
import image_not_found from '../../assets/image_not_found.png'
import { baseUrl } from "../../api/baseUrl";

const ArtistBlock: React.FunctionComponent<IArtistBlockProps> = (props): React.ReactElement => {
    return (
        <div className={styles.ArtistBlock}>
            <div className={styles.Image_frame}>
                <img 
                    className={styles.Artist_image}
                    src={baseUrl + 'uploads/artists/' + props.artist.photo}
                    alt={props.artist.name + 'image'}
                    onError = {(e) => {
                        e.currentTarget.src = image_not_found
                    }}
                />
            </div>
            <h1 className={styles.Artist_header}>{props.artist.name}</h1>
                <button
                    className={styles.Search_button}
                    onClick={props.searchAlbums}
                >Learn more</button>
        </div>
    )
}

export default ArtistBlock