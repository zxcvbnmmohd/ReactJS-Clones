import React from 'react';
import { useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MicIcon from '@material-ui/icons/Mic';
// import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';

import Channels from './channels/Channels.js';
import { getUser } from '../../../../backend/redux/reducers/authReducer';
import { auth } from '../../../../backend/configs/firebase';

import './Sidebar.css';

function Sidebar() {
    const user = useSelector(getUser);

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h5>zxcvbnmmohd's server</h5>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__mid">
                <div className="sidebar__head">
                    <div className="sidebar__drop">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className='sidebar__add' />
                </div>

                <div className="sidebar__channels">
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                </div>

                <div className="sidebar__head">
                    <div className="sidebar__drop">
                        <ExpandMoreIcon />
                        <h4>Voice Channels</h4>
                    </div>
                    <AddIcon className='sidebar__add' />
                </div>

                <div className="sidebar__channels">
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                </div>
            </div>


            <div className="sidebar__btm">
                <Avatar
                    className="sidebar__btm__selfie"
                    src={user.selfie}
                    onClick={() => { auth.signOut() }} />
                <div className="sidebar__btm__texts">
                    <h5>{user.name}</h5>
                    <h6>#{user.userID.substring(0, 5)}</h6>
                </div>
                <div className="sidebar__btm__icons">
                    <MicIcon className="sidebar__btm__icons_icon" />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>

        </div>
    )
}

export default Sidebar
