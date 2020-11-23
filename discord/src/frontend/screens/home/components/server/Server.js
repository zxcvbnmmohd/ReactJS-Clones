import React from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '../../../../../backend/redux/reducers/authReducer';
import { auth } from '../../../../../backend/configs/firebase';

import { Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MicIcon from '@material-ui/icons/Mic';
// import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';

import Channels from './channels/Channels.js';

import './Server.css';

function Server(props) {
    const user = useSelector(getUser);

    return (
        <div className="server">
            <div className="server__top">
                <h5>zxcvbnmmohd's server</h5>
                <ExpandMoreIcon />
            </div>

            <div className="server__mid">
                <div className="server__head">
                    <div className="server__drop">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className='server__add' />
                </div>

                <div className="server__channels">
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                </div>

                <div className="server__head">
                    <div className="server__drop">
                        <ExpandMoreIcon />
                        <h4>Voice Channels</h4>
                    </div>
                    <AddIcon className='server__add' />
                </div>

                <div className="server__channels">
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                    <Channels channel='Youtube' />
                </div>
            </div>


            <div className="server__btm">
                <Avatar
                    className="server__btm__selfie"
                    src={user.selfie}
                    onClick={() => { auth.signOut() }} />
                <div className="server__btm__texts">
                    <h5>{user.name}</h5>
                    <h6>#{user.userID.substring(0, 5)}</h6>
                </div>
                <div className="server__btm__icons">
                    <MicIcon className="server__btm__icons_icon" />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>

        </div>
    )
}

export default Server
