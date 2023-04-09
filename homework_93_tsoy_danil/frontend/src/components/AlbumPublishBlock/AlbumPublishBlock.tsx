import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image_not_found from '../../assets/image_not_found.png'
import IAlbumPublishBlockProps from './IAlbumPublishBlockProps';


const AlbumPublishBlock: React.FunctionComponent<IAlbumPublishBlockProps> = (props): React.ReactElement => {
    return (
    <Card 
        sx={{ maxWidth: 345, width: '100%', marginBottom: '10px' }}
    >
    <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={import.meta.env.VITE_BASE_URL + 'uploads/albums/' + props.album.coverImage}
        title={props.album.title + 'image'}
        onError={(e) => {
            e.currentTarget.src = image_not_found
        }}
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.album.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Release year: {new Date(props.album.releaseYear).toLocaleDateString()}
        </Typography>
    </CardContent>
    <CardActions>
        <Button size="small" color="success" onClick={props.publishAlbum}>Publish</Button>
        <Button size="small" color="error" onClick={props.deleteAlbum}>Delete</Button>
    </CardActions>
    </Card>
    )
}

export default AlbumPublishBlock