import React from 'react';

import './Register.css';

function Register(props) {
    return (
        <div className='register'>
            <div className='register__form'>
                <h2>Welome Back!</h2>

                <p>We're so excited to see you again!</p>

                <div className='register__form__textFields'>
                    <form onSubmit={(e) => props.onSubmit(e)}>
                        <input placeholder='Username' value={props.username} onChange={(e) => props.setUsername(e)} />
                        <input placeholder='Email' value={props.email} onChange={(e) => props.setEmail(e)} />
                        <input placeholder='Password' value={props.password} onChange={(e) => props.setPassword(e)} />
                        <button type='submit'>Register</button>
                    </form>
                </div>

                <h5 className='register__form__toLogin' onClick={props.toLogin}>Already have an account?</h5>

                <div className='register__form__register'>
                    <h6>By registering, you agree to Discord's</h6>

                    <div className='register__form__register__button'>
                        <h6 onClick={props.terms}>Terms of Service</h6>
                    </div>

                    <h6>and</h6>

                    <div className='register__form__register__button'>
                        <h6 onClick={props.privacy}>Privacy Policy.</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
