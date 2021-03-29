import React from 'react';
import Map from './Map';
import SignInForm from '../components/Forms/SignInForm';

const SignIn = ({ isSignup }) => {
    let body = (
        <Map>
            <div style={{
                position: 'absolute',
                left: 0,
                backgroundColor: '#292929', 
                height: '100%',
                width: '40%'
                }}>
                <SignInForm isSignup={isSignup}/>
            </div>
        </Map>
    );
    if(window.innerWidth < 1020){
        body = (
            <div style={{
                backgroundColor: '#292929', 
                height: '100%',
                width: '100%'
                }}>
                <SignInForm  isSignup={isSignup}/>
            </div>
        )
    }
    return body;
}

export default SignIn;