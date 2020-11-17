//rfce

import React from 'react';
import Message from './message/Message.js';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import './Chat.css';

function Chat() {
    return (
        <div className='chat'>
            <div className="chat__head">
                <div className="chat__head__title">
                    <h5># general</h5>
                </div>
                <div className="chat__head__actions">
                    <NotificationsIcon />
                    <BookmarkIcon />
                    <PeopleAltIcon />
                </div>
            </div>

            <div className="chat__messages">
                <Message />
                <Message />
                <Message />
            </div>

            <div className="chat__textField">
                <AddCircleIcon />
                <form>
                    <input placeholder='Message #general' />
                    <button className='chat__textField__button' type="submit">Senmd</button>
                </form>
                <div className="chat__textField__options">
                    <RedeemIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat
