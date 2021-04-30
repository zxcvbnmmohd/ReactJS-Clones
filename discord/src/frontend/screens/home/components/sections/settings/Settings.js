import React from 'react'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'

import './Settings.css'

function Settings() {
    return (
        <div className='settings'>
            <div className='settings__head'>
                <div className='settings__head__title'>
                    <h5>Settings</h5>
                </div>
                <div className='settings__head__actions'>
                    <NotificationsIcon className='settings__head__actions__icon' />
                    <BookmarkIcon className='settings__head__actions__icon' />
                    <PeopleAltIcon className='settings__head__actions__icon' />
                </div>
            </div>

        </div>
    )
}

export default Settings
