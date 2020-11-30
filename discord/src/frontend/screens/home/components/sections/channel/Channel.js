import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import firestore, { firebase } from "../../../../../../backend/configs/firebase";
import { getCurrentUser } from "../../../../../../backend/redux/reducers/authReducer";
import { getCurrentChannel } from "../../../../../../backend/redux/reducers/channelsReducer";
import { getCurrentServer } from "../../../../../../backend/redux/reducers/serversReducer";
import Message from './message/Message.js';

import './Channel.css';

function Channel() {
    const currentUser = useSelector(getCurrentUser);
    const currentChannel = useSelector(getCurrentChannel);
    const currentServer = useSelector(getCurrentServer);
    const [msg, setMsg] = useState("");

    const msgsCollection = firestore.collection("servers").doc(currentServer.serverID).collection("channels").doc(currentChannel.channelID).collection("messages");
    const msgsQuery = msgsCollection.orderBy("createdAt");

    const [messages] = useCollectionData(msgsQuery, { idField: 'msgID' });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (msg) {
            await msgsCollection.add({
                ownerID: currentUser.userID,
                type: 'text',
                msg: msg,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });

            setMsg();
        }
    };

    return (
        <div className='channel'>
            <div className="channel__head">
                <div className="channel__head__title">
                    <h5># {currentChannel.name}</h5>
                </div>
                <div className="channel__head__actions">
                    <NotificationsIcon />
                    <BookmarkIcon />
                    <PeopleAltIcon />
                </div>
            </div>

            <div className="channel__messages">
                {
                    messages && messages.map((msg) => <Message key={msg.msgID} msg={msg.msg} />)
                }
            </div>

            <div className="channel__textField">
                <AddCircleIcon />

                <form onSubmit={onSubmit}>
                    <input placeholder={'Message #' + currentChannel.name} type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button className='channel__textField__button' type="submit" disabled={!msg}>Send</button>
                </form>

                <div className="channel__textField__options">
                    <RedeemIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Channel
