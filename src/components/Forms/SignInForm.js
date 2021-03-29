import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

import { Typography, Grid, TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from './styles';
import { signInAndSignOutAction } from '../../store/actions/entries';

const SignInForm = ({ isSignup, history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false
    });

    const handleFormSubmittion = event => {
        event.preventDefault();
        if(isSignup){
            const details = {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            }
            return dispatch(signInAndSignOutAction(details, isSignup));
        }
        const details = {
            email: values.email,
            password: values.password
        }
        dispatch(signInAndSignOutAction(details, isSignup));
    }
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleOtherButton = () => {
        setValues({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false
        });
        if(isSignup){
            history.push('/auth');
        }else{
            history.push('/auth/create-account');
        }
    }

    return(
        <div style={{width: '100%', backgroundColor: '#292929', margin: '10% auto'}}>
            <Grid container direction="row" style={{  margin: '1em auto' }}>
                <form 
                    autoComplete="off" 
                    noValidate
                    onSubmit={event => handleFormSubmittion(event)} 
                    className={`${classes.root} ${classes.form}`} 
                    style={{margin: '0 auto', width: '100%'}}>

                    <Typography variant="h4" style={{margin: '1em auto'}}>
                        {isSignup ? 'Create a new account' : 'Sign in to your account'}
                    </Typography>

                    {isSignup ?
                        <TextField 
                            name="name" 
                            variant="outlined" 
                            type="text"
                            label="Full Name" 
                            fullWidth
                            placeholder="Enter full name"
                            value={values.name}
                            onChange={handleChange('name')}/>
                        : null
                    }

                    <TextField 
                        name="email" 
                        variant="outlined" 
                        label="Email" 
                        type="email"
                        fullWidth
                        placeholder={isSignup ? 'Enter a valid email address' : 'Email address'}
                        color="warning"
                        style={{ color: '#fff' }}
                        value={values.email}
                        onChange={handleChange('email')}
                        />

                    <TextField 
                        name="password" 
                        variant="outlined" 
                        type={values.showPassword ? 'text' : 'password'}
                        label="Password" 
                        fullWidth
                        placeholder={isSignup ? 'Create password' : 'Password'}
                        value={values.password}
                        onChange={handleChange('password')}/>
                    
                    {isSignup ?
                        <TextField 
                            name="confirmPassword" 
                            variant="outlined" 
                            type={values.showPassword ? 'text' : 'password'}
                            label="Confirm password" 
                            fullWidth
                            placeholder="Confirm your password"
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}/>
                        : null
                    }
                    
                    
                    <FormControlLabel
                        control={
                            <Checkbox icon={<VisibilityOff />}  
                            checkedIcon={<Visibility />} 
                            name="showPassword"
                            onChange={handleClickShowPassword} />
                            }
                            label={<Typography component="p" style={{color: '#fff'}}>Show Password</Typography>}
                    />

                    <div style={{width: '100%', margin: '2em auto'}}>
                        <Button 
                            className={classes.buttonSubmit} 
                            color="primary"
                            variant="contained"
                            fullWidth size="medium" 
                            type="submit">{isSignup ? 'Create account' : 'Sign in'}</Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small" 
                            onClick={handleOtherButton}
                            fullWidth>{isSignup ? 'Back to sign in' : 'Create an account'}</Button>
                    </div>
                </form>
            </Grid>
        </div>
    );
}

export default withRouter(SignInForm);