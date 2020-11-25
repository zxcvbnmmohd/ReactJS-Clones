import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel, getCurrentChannel } from "../../../../../../../backend/redux/reducers/channelsReducer";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './Channels.css';

function Channels({ channel }) {
    const dispatch = useDispatch();
    const currentChannel = useSelector(getCurrentChannel);

    return (
        <div className='channels' onClick={() => dispatch(setCurrentChannel(channel))}>
            <div className="channels__channel">
                <span className="channels__hash">{currentChannel.channelID === channel.channelID ? '-' : '#'}</span>
                <span className="channels__name"> {channel}</span>
            </div>
            <div className="channels__settings">
                <PersonAddIcon className='channels__add_icon' fontSize='small' />
                <SettingsIcon className='channels__settings_icon' fontSize='small' />
            </div>
        </div>
    )
}

export default Channels
