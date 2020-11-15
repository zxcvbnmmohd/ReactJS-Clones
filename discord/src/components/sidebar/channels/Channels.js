import React from 'react';
import './Channels.css';

function Channels({ id, channel }) {
    return (
        <div chanelName='channels'>
            <h1>
                <span className="channels__hash"># {channel}</span>
            </h1>
        </div>
    )
}

export default Channels
