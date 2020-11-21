import React from 'react';
import { Button } from '@material-ui/core';

import './Register.css';

function Register(props) {
    return (
        <div className="register">
            <div className="register__form">
                <h2>Welome Back!</h2>

                <p>We're so excited to see you again!</p>

                <div className="register__textFields">
                    <form>
                        <input placeholder='Email' />
                        <input placeholder='Username' />
                        <input placeholder='Password' />
                        <button className='register__textField__button' type="submit">Send</button>
                    </form>
                </div>


                <Button onClick={ props.register }>Register</Button>

                <h5 className="register__toLogin" onClick={ props.toLogin }>Already have an account?</h5>

                <div className="register__form__register">
                    <h6>By registering, you agree to Discord's</h6>

                    <div className="register__form__register__button">
                        <h6 onClick={ props.terms }>Terms of Service</h6>
                    </div>

                    <h6>and</h6>

                    <div className="register__form__register__button">
                        <h6 onClick={ props.privacy }>Privacy Policy.</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
