import React, { useState } from 'react';
import { auth, googleProvider } from '../../../backend/configs/firebase';
// import { auth } from '../../backend/services';
import Login from './login/Login';
import Register from './register/Register';

import './Auth.css';

function Auth() {
    const [toRegister, setToRegister] = useState(false);
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [dob, setDOB] = useState();

    const login = () => {
        auth.signInWithPopup(googleProvider).catch((err) => alert(err.message));
    };

    return (
        <div className='auth'>
            <div className="auth__logo">
                <img
                    src='https://forum.jellyro.com/uploads/monthly_2016_11/Discord_Purple_Tight.png.1ed2ade737b458d4ddda66c03346311a.png'
                    alt='logo' />
            </div>
            {
                toRegister
                    ? <Register
                        register={ () => {} }
                        toLogin={ () => setToRegister(false) }
                        terms={ () => {} }
                        privacy={ () => {} }/>
                    : <Login
                        forgot={ login } 
                        login={ login }
                        toRegister={ () => setToRegister(true) } />
            }
            
        </div>
    )
}

export default Auth
