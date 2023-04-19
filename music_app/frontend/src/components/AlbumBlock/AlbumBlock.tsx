import React from "react";
import IAlbumBlockProps from "./IAlbumBlockProps";
import styles from './AlbumBlock.module.css'
import image_not_found from '../../assets/image_not_found.png'
import { baseUrl } from "../../api/baseUrl";


const AlbumBlock: React.FunctionComponent<IAlbumBlockProps> = (props): React.ReactElement => {
    return (
        <div
        onClick={props.searchTracks}
        className={styles.AlbumBlock}>
            <img 
                className={styles.Album_cover}
                src={baseUrl + 'uploads/albums/' + props.album.coverImage}
                alt={props.album.title + 'image'}
                onError = {(e) => {
                    e.currentTarget.src = image_not_found
                }}
            />
            <h1 className={styles.Album_header}>{props.album.title}</h1>
            <p className={styles.Album_date}>{new Date(props.album.releaseYear).toLocaleDateString()}</p>
        </div>
    )
}

export default AlbumBlock