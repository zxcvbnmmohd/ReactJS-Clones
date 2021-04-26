
import React from 'react';
import { Avatar } from '@material-ui/core';

import './Message.css';

function Message(props) {
    return (
        <div className='message' >
            <Avatar src='' />
            <div className='message__texts'>
                <div className='message__texts__info'>
                    <h4>zxcvbnmmohd</h4>
                    <h6>Today at 6:50 PM</h6>
                </div>
                <div className='message__texts__msg'>
                    <p>{props.msg}</p>
                </div>

            </div>
        </div >
    )
}

export default Message
