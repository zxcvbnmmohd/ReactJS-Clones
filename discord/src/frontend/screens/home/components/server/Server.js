import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import firestore, { auth } from '../../../../../backend/configs/firebase';
import {
    addTextChannel,
    updateTextChannel,
    removeTextChannel,

    addVoiceChannel,
    updateVoiceChannel,
    removeVoiceChannel,

    setCurrentChannel,

    getTextChannels,
    getVoiceChannels,
    getCurrentChannel,
} from "../../../../../backend/redux/reducers/channelsReducer";
import { getCurrentServer } from "../../../../../backend/redux/reducers/serversReducer";
import { getUser } from '../../../../../backend/redux/reducers/authReducer';

import { Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MicIcon from '@material-ui/icons/Mic';
// import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';

import Channels from './channels/Channels.js';

import './Server.css';

function Server() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const currentServer = useSelector(getCurrentServer);
    const textChannels = useSelector(getTextChannels);
    const voiceChannels = useSelector(getVoiceChannels);
    const currentChannel = useSelector(getCurrentChannel);

    useEffect(() => {
        console.log("useEffect");

        const unsubscribe = firestore.collection("servers").doc(currentServer.serverID).collection("channels").onSnapshot((snapshot) => {
            console.log("Started");

            snapshot.docChanges().forEach((change) => {
                const channel = {
                    channelID: change.doc.id,
                    type: change.doc.data().type,
                    name: change.doc.data().name,
                    users: change.doc.data().users,
                };

                if (change.type === "added") {
                    console.log("New Server: ", channel);

                    if (currentChannel === null) dispatch(setCurrentChannel(channel));
                    dispatch(channel.type === "text" ? addTextChannel(channel) : addVoiceChannel(channel));
                }
                if (change.type === "modified") {
                    console.log("Modified Server: ", channel);

                    dispatch(channel.type === "text" ? updateTextChannel(channel) : updateVoiceChannel(channel));
                }
                if (change.type === "removed") {
                    console.log("Removed Server: ", channel);

                    dispatch(channel.type === "text" ? removeTextChannel(channel) : removeVoiceChannel(channel));
                }
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleAddNewChannel = (type) => {
        const name = prompt("Create new channel");

        if (name) {
            firestore.collection("servers").doc(currentServer.serverID).collection("channels").add({
                name: name,
                users: [],
                type: type,
            });
        }
    };

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
                    <AddIcon className='server__add' onClick={() => handleAddNewChannel("text")} />
                </div>

                <div className="server__channels">
                    {
                        textChannels.map((channel) => <Channels key={channel.channelID} current={currentChannel === channel} channel={channel.name} />)
                    }
                </div>

                <div className="server__head">
                    <div className="server__drop">
                        <ExpandMoreIcon />
                        <h4>Voice Channels</h4>
                    </div>
                    <AddIcon className='server__add' onClick={() => handleAddNewChannel("voice")} />
                </div>

                <div className="server__channels">
                    {
                        voiceChannels.map((channel) => <Channels key={channel.channelID} current={currentChannel === channel} channel={channel.name} />)
                    }
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
