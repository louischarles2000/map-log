import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, ListItemIcon, CardMedia, CardContent, Typography, IconButton, Divider, Box } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import { Edit, Delete, LocationOn } from '@material-ui/icons';

import useStyles from './styles';
import { setIsEditingAction, updateViewport, deletePostAction } from '../../../store/actions/entries';
import { initViewport } from '../../../utility';

const Post = ({ postDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ zoomed, setZoomed ] = useState(false);

  const zoomIn = () => {
    if(zoomed){
      dispatch(updateViewport(initViewport));
      setZoomed(false);
      return;
    }
    const view = {
      zoom: postDetails.zoom,
      longitude: postDetails.longitude,
      latitude: postDetails.latitude
    }
    dispatch(updateViewport(view));
    setZoomed(true);
  }

  const deletePost = async id => {
    //delete post
    dispatch(deletePostAction(id));
  }

  const showEditForm = () => {
    dispatch(setIsEditingAction(true));
  };

  return (
    <Card className={classes.root} style={{backgroundColor: '#292929', margin: -12}}>
      {postDetails.image ? <CardMedia
          className={classes.media}
          image={postDetails.image}
          title={postDetails.title}
        /> : null}
      <CardContent className={classes.cardBody}>
        <ListItemIcon >
          <div onClick={zoomIn}>
            <LocationOn color="error" style={{paddingRight: '10px'}}/>
          </div>
          <Typography variant="h5" color="textPrimary" component="p">
              {postDetails.title}
          </Typography>
        </ListItemIcon>
        <Divider className={classes.divider} style={{backgroundColor: '#555'}}/>
        {/* <ListItemIcon> */}
          <Typography variant="body2" color="textPrimary" component="p" style={{color: '#555'}}>
            {/* <DateRange style={{fontSize: '15px', paddingRight: '10px'}}/> */}
              Visited on {postDetails.visitDate.split('T')[0]}
          </Typography>
        {/* </ListItemIcon> */}
        <Typography variant="body1" color="textSecondary" component="p" style={{padding: 5}}>
            {postDetails.description}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p" style={{padding: 5}}>
            {postDetails.comments}
        </Typography>
        <Divider className={classes.divider} style={{backgroundColor: '#555'}}/>
        <Typography variant="body2" color="textSecondary" component="p">
            Rating
        </Typography>
        <Box component="fieldset" mb={-1} borderColor="transparent" width="100%" alignItems="left">
            <Rating value={postDetails.rating} readOnly max={10}/>
        </Box>
      </CardContent>
      <IconButton onClick={showEditForm}>
        <Edit style={{color: 'blue'}}/>
      </IconButton>
      <IconButton onClick={deletePost.bind(this, postDetails._id)}>
        <Delete color="error"/>
      </IconButton>
    </Card>
  );
}

export default Post;