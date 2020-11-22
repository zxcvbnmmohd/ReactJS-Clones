import React, { useState } from 'react';
import { auth, googleProvider } from '../../../backend/configs/firebase';
// import { auth } from '../../backend/services';
import Login from './login/Login';
import Register from './register/Register';

import './Auth.css';

function Auth() {
    const [toRegister, setToRegister] = useState(false);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [dob, setDOB] = useState();
    const [error, setError] = useState();

    const login = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log('User Logged In.');
                if (res.user) console.log(res.user.uid);
            })
            .catch((err) => setError(err));
    };

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log('User Registered');
                if (res.user) console.log(res.user.uid);
            })
            .catch((err) => setError(err));
    };

    const forgot = () => { };

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
                        onSubmit={(e) => register(e)}
                        username={username}
                        email={email}
                        password={password}
                        setUsername={(e) => setUsername(e.target.value)}
                        setEmail={(e) => setEmail(e.target.value)}
                        setPassword={(e) => setPassword(e.target.value)}
                        toLogin={() => setToRegister(false)}
                        terms={() => { }}
                        privacy={() => { }} />
                    : <Login
                        onSubmit={(e) => login(e)}
                        email={email}
                        password={password}
                        setEmail={(e) => setEmail(e.target.value)}
                        setPassword={(e) => setPassword(e.target.value)}
                        forgot={forgot}
                        toRegister={() => setToRegister(true)} />
            }

        </div>
    )
}

export default Auth
