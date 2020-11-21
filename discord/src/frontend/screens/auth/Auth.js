import React, { useState } from 'react';
import Login from './login/Login';
import Register from './register/Register';

import './Auth.css';

function Auth() {
    const [toRegister, setToRegister] = useState(false);

    return (
        <div className='auth'>
            <div className="auth__logo">
                <img
                    src='https://forum.jellyro.com/uploads/monthly_2016_11/Discord_Purple_Tight.png.1ed2ade737b458d4ddda66c03346311a.png'
                    alt='logo' />
            </div>
            {
                toRegister
                    ? <Register toLogin={ () => setToRegister(false) } />
                    : <Login toRegister={ () => setToRegister(true) } />
                    
            }
            
        </div>
    )
}

export default Auth
