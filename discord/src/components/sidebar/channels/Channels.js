import React from 'react';
import './Channels.css';

function Channels({ id, channel }) {
    return (
        <div className='channels'>
            <div className="channels__channel">
                <span className="channels__hash">#</span>
                <span className="channels__name"> { channel }</span>
            </div>
        </div>
    )
}

export default Channels
