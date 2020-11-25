import React from 'react';
import Message from './message/Message.js';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RedeemIcon from '@material-ui/icons/Redeem';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import './Channel.css';

function Channel(props) {
    return (
        <div className='channel'>
            <div className="channel__head">
                <div className="channel__head__title">
                    <h5># general</h5>
                </div>
                <div className="channel__head__actions">
                    <NotificationsIcon />
                    <BookmarkIcon />
                    <PeopleAltIcon />
                </div>
            </div>

            <div className="channel__messages">
                <Message />
                <Message />
                <Message />
            </div>

            <div className="channel__textField">
                <AddCircleIcon />
                <form>
                    <input placeholder='Message #general' />
                    <button className='channel__textField__button' type="submit">Senmd</button>
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
