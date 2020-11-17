import React from 'react';
import { Button } from '@material-ui/core';
import { auth, googleProvider } from '../../../../backend/configs/firebase';
// import { auth } from '../../backend/services';
import './Login.css';

function Login() {
    const login = () => {

        auth.signInWithPopup(googleProvider).catch((err) => alert(err.message));
    };

    return (
        <div className="login">
            <div className="login__logo">
                <img
                    src='https://forum.jellyro.com/uploads/monthly_2016_11/Discord_Purple_Tight.png.1ed2ade737b458d4ddda66c03346311a.png'
                    alt='logo' />
            </div>
            <Button onClick={login}>Login with Google</Button>
        </div>
    )
}

export default Login
