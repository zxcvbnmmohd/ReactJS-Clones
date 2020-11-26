import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../../../../../../backend/redux/reducers/channelsReducer";
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './ChannelItem.css';

function ChannelItem({ current, channel }) {
    const dispatch = useDispatch();

    return (
        current
            ? <div className='channelItemCurrent' onClick={() => dispatch(setCurrentChannel(channel))}>
                <div className="channelItem__channel">
                    <span className="channelItem__hash">#</span>
                    <span className="channelItem__name"> {channel.name}</span>
                </div>
                <div className="channelItem__settings">
                    <PersonAddIcon className='channelItem__add_icon' fontSize='small' />
                    <SettingsIcon className='channelItem__settings_icon' fontSize='small' />
                </div>
            </div>
            : <div className='channelItem' onClick={() => dispatch(setCurrentChannel(channel))}>
                <div className="channelItem__channel">
                    <span className="channelItem__hash">#</span>
                    <span className="channelItem__name"> {channel.name}</span>
                </div>
                <div className="channelItem__settings">
                    <PersonAddIcon className='channelItem__add_icon' fontSize='small' />
                    <SettingsIcon className='channelItem__settings_icon' fontSize='small' />
                </div>
            </div>
    )
}

export default ChannelItem
