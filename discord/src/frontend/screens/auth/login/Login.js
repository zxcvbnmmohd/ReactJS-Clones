import React from 'react';
import { Button } from '@material-ui/core';

import './Login.css';

function Login(props) {

    return (
        <div className="login">
            <div className="login__form">
                <h2>Welome Back!</h2>

                <p>We're so excited to see you again!</p>

                <div className="login__form__textFields">
                    <form onSubmit={(e) => props.onSubmit(e)}>
                        <input placeholder='Email' value={props.email} onChange={(e) => props.setEmail(e)} />
                        <input placeholder='Password' value={props.password} onChange={(e) => props.setPassword(e)} />

                        <h5 onClick={props.forgot}>Forgot your password?</h5>
                        
                        <button type="submit">Login</button>
                    </form>
                </div>


                <div className="login__form__register">
                    <h6>Need an account?</h6>

                    <div className="login__form__register__button">
                        <h6 className="login__form__register__button__toRegister" onClick={props.toRegister}>Register.</h6>
                    </div>
                </div>
            </div>

            <div className="login__qrCode">
                <img
                    src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7f2a46c8-4772-44a2-9c74-a37d7ba147fe/ddypmz6-d7f88138-3085-4dfc-97e8-9cb6b2d3b13f.jpg/v1/fill/w_415,h_409,q_75,strp/no_this_is_not_a_rick_roll_qr_code__by_kingdrago43_ddypmz6-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD00MDkiLCJwYXRoIjoiXC9mXC83ZjJhNDZjOC00NzcyLTQ0YTItOWM3NC1hMzdkN2JhMTQ3ZmVcL2RkeXBtejYtZDdmODgxMzgtMzA4NS00ZGZjLTk3ZTgtOWNiNmIyZDNiMTNmLmpwZyIsIndpZHRoIjoiPD00MTUifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DmsGQkrefiKdg06G74SjY_0eUFTTtqSaOCWJTiD_Ans'
                    alt='logo' />

                <h2>Log in with QR Code</h2>

                <p>Scan this with the <b>Discord mobile app</b> to log in instantly</p>
            </div>
        </div>
    )
}

export default Login
