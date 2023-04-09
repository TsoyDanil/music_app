import IArtistPublishBlockProps from "./IArtistPublishBlockProps";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image_not_found from '../../assets/image_not_found.png'

const ArtistPublishBlock: React.FunctionComponent<IArtistPublishBlockProps> = (props): React.ReactElement => {

    return (
        <Card 
            sx={{ maxWidth: 345, width: '100%', marginBottom: '10px' }}
        >
        <CardMedia
            component="img"
            sx={{ height: 140 }}
            image={import.meta.env.VITE_BASE_URL + 'uploads/artists/' + props.artist.photo}
            title={props.artist.name + 'image'}
            onError={(e) => {
                e.currentTarget.src = image_not_found
            }}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {props.artist.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {props.artist.information}
            </Typography>
        </CardContent>
        <CardActions>
            {
                !props.artist.isPublished ? <Button size="small" color="success" onClick={props.publishArtist}>Publish</Button> : null
            }
            <Button size="small" color="error" onClick={props.deleteArtist}>Delete</Button>
        </CardActions>
        </Card>
    )   
}

export default ArtistPublishBlock