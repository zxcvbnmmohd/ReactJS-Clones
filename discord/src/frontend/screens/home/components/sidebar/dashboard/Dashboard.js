import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import AddIcon from '@material-ui/icons/Add'
import HeadsetIcon from '@material-ui/icons/Headset'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import SettingsIcon from '@material-ui/icons/Settings'

import {
  auth,
  isMicOn,
  setMicOn,
  setMicOff,
  getCurrentPage,
  setCurrentPage,
  getCurrentUser,
} from '../../../../../../backend'

import './Dashboard.css'

function Dashboard() {
  const dispatch = useDispatch()
  const currentUser = useSelector(getCurrentUser)
  const currentPage = useSelector(getCurrentPage)
  const mic = useSelector(isMicOn)

  return (
    <div className='dashboard'>
      <div className='dashboard__top'>
        <form onSubmit={(e) => {}}>
          <input placeholder='Find or start a conversation' />
          <button type='submit'>Search</button>
        </form>
      </div>

      <div className='dashboard__mid'>
        <div className='dashboard__mid__actions'>
          <div
            className={
              currentPage === 'Friends'
                ? 'dashboard__mid__actions__actionActive'
                : 'dashboard__mid__actions__action'
            }
            onClick={() => dispatch(setCurrentPage('Friends'))}
          >
            <SupervisorAccountIcon className='server__mid__actions__action__icon' />
            <h4>Friends</h4>
          </div>

          <div
            className={
              currentPage === 'Settings'
                ? 'dashboard__mid__actions__actionActive'
                : 'dashboard__mid__actions__action'
            }
            onClick={() => dispatch(setCurrentPage('Settings'))}
          >
            <SettingsIcon className='server__mid__actions__action__icon' />
            <h4>Settings</h4>
          </div>
        </div>

        <div className='dashboard__mid__dms'>
          <h5>Direct Messages</h5>
          <AddIcon className='server__mid__dms__add' />
        </div>

        {/* <div className='dashboard__mid__channels'>
          {textChannels.map((channel) => (
            <Channels
              key={channel.channelID}
              current={currentChannel === channel}
              channel={channel.name}
            />
          ))}
        </div> */}
      </div>

      <div className='dashboard__btm'>
        <Avatar
          className='dashboard__btm__selfie'
          src={currentUser.selfie}
          onClick={() => {
            auth.signOut()
          }}
        />
        <div className='dashboard__btm__texts'>
          <h5>{currentUser.email}</h5>
          <h6>#{currentUser.userID}</h6>
        </div>
        <div className='dashbaord__btm__icons'>
          {mic ? (
            <MicIcon
              className='dashboard__btm__icons__icon'
              onClick={() => dispatch(setMicOff())}
            />
          ) : (
            <MicOffIcon
              className='dashboard__btm__icons__icon'
              onClick={() => dispatch(setMicOn())}
            />
          )}
          <HeadsetIcon className='dashboard__btm__icons__icon' />
          <SettingsIcon className='dashboard__btm__icons__icon' />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
