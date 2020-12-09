import React from 'react';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import './Friends.css';

function Friends() {
    return (
        <div className='friends'>
            <div className='friends__head'>
                <div className='friends__head__title'>
                    <h5>Friends</h5>
                </div>
                <div className='friends__head__actions'>
                    <NotificationsIcon className='friends__head__actions__icon' />
                    <BookmarkIcon className='friends__head__actions__icon' />
                    <PeopleAltIcon className='friends__head__actions__icon' />
                </div>
            </div>

        </div>
    )
}

export default Friends
