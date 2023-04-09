import React from "react";
import ITrackPublishBlockProps from "./ITrackPublishBlockProps";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const TrackPublishBlock: React.FunctionComponent<ITrackPublishBlockProps> = (props): React.ReactElement => {

    return (
            <Card 
                sx={{ maxWidth: 345, width: '100%', marginBottom: '10px' }}
            >
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.track.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Length: {Math.floor(props.track.length / 60)}:{props.track.length % 60 < 10 ? "0" : ""}{props.track.length % 60}
                </Typography>
            </CardContent>
            <CardActions >
                <Button size="small" color="success" onClick={props.publishTrack}>Publish</Button>
                <Button size="small" color="error" onClick={props.deleteTrack}>Delete</Button>
            </CardActions>
            </Card>
    )
}

export default TrackPublishBlock