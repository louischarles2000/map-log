import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import { setIsEditingAction, updateFormFieldValue, clearFormFeilds, postEntryAction, editEntryAction } from '../../store/actions/entries';

const Form = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector(state => state.entriesState);
    
      useEffect(() => {
        if(state.isEditing){
            // console.log(props.oldData);
            for(let field in props.oldData){
                // console.log(field + ' ' + props.oldData[field]);
                dispatch(updateFormFieldValue(field, props.oldData[field]));
            }
            // console.log(state.formEntryData);
        }else{
            dispatch(updateFormFieldValue('zoom', state.viewport.zoom));
            dispatch(updateFormFieldValue('longitude', props.longitude));
            dispatch(updateFormFieldValue('latitude', props.latitude));
        }
    }, []);

    
    const handleSubmit = async e => {
        e.preventDefault();
        if(state.isEditing){
            return editPost();
        }
        const newPost = {
            ...state.formEntryData,
            zoom: state.viewport.zoom
        }
        dispatch(postEntryAction(newPost));
    }

    const editPost = async ()=> {
        const editedEntry = {
            ...props.oldData,
            ...state.formEntryData
        }
        dispatch(editEntryAction(editedEntry));
    }

    const clear = () => {
        if(state.isEditing){
            dispatch(setIsEditingAction(false));
        }
        dispatch(clearFormFeilds());
    }

    
    const isValid = () => {
        let valid = false;
        if(state.formEntryData.image !== '' && state.formEntryData.title !== '', state.formEntryData.comments !== ''){
            valid = true;
        }else if(props.oldData !== state.formEntryData){
            valid = false;
        }
        return valid;
    }
    
    const onChangeEntry = (event, name) => {
        switch(name){
            case 'rating':
                const rating = parseInt(event.target.value);
                return dispatch(updateFormFieldValue(name, rating));
            case 'image': 
                return dispatch(updateFormFieldValue('image', event));
            default:
                event.preventDefault();
                return dispatch(updateFormFieldValue(name, event.target.value));
        }
    }
    return(
        <Paper className={classes.paper}  style={{backgroundColor: '#292929', margin: -12}}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{props.isEditing ? 'Edit Visit' : 'Create Visit'}</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={state.formEntryData.title}
                    onChange={event => onChangeEntry(event, 'title')}/>
                <TextField 
                    name="description" 
                    variant="outlined" 
                    label="Description (Optional)" 
                    fullWidth
                    value={state.formEntryData.description}
                    onChange={event =>  onChangeEntry(event, 'description')}/>
                <TextField 
                    name="comments" 
                    variant="outlined" 
                    label="Comments" 
                    fullWidth
                    value={state.formEntryData.comments}
                    onChange={event =>  onChangeEntry(event, 'comments')}/>
                <TextField
                    name="visitDate"
                    label={props.isEditing ? 'Change Visit Date?' : 'Visit Date'}
                    type="date"
                    fullWidth
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={state.formEntryData.visitDate}
                    onChange={event =>  onChangeEntry(event, 'visitDate')}
                />

                <div className={classes.fileInput}>
                    <Typography>{props.isEditing ? 'Choose a different image' : 'Choose an image'}</Typography>
                    <FileBase 
                        type="file"
                        multiple={false}
                        value={state.formEntryData.image}
                        onDone={({base64}) => onChangeEntry(base64, 'image')}
                        />
                </div>

                <Box component="fieldset" mb={3} borderColor="transparent" >
                    <Typography component="legend" align="center">Rate Your Visit!</Typography>
                    <Rating 
                        name="image" 
                        defaultValue={1} 
                        value={state.formEntryData.rating} 
                        max={10} 
                        onChange={rating =>  onChangeEntry(rating, 'rating')}/>
                </Box>

                <Button 
                    className={classes.buttonSubmit} 
                    variant="contained"
                    fullWidth size="large" 
                    type="submit"
                    disabled={!isValid() || state.loading}>
                        {
                            state.loading ?
                            'Loading...'
                            :
                            state.isEditing ? 'Post Edit' : 'Add a Visit'
                        }
                    </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear} 
                    fullWidth>{state.isEditing ? 'Cancel editing mode' : 'Clear'}</Button>
            </form>
        </Paper>
    );
}
export default Form;