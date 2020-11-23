import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './Channels.css';

function Channels({ id, channel }) {
    return (
        <div className='channels'>
            <div className="channels__channel">
                <span className="channels__hash">#</span>
                <span className="channels__name"> { channel }</span>
            </div>
            <div className="channels__settings">
                <PersonAddIcon className='channels__add_icon'  fontSize='small' />
                <SettingsIcon className='channels__settings_icon' fontSize='small' />
            </div>
        </div>
    )
}

export default Channels
