import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HeadsetIcon from '@material-ui/icons/Headset';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import SettingsIcon from '@material-ui/icons/Settings';

import {
  auth,
  isMicOn,
  setMicOn,
  setMicOff,
  getCurrentUser,
  updateChannel,
  removeChannel,
  clearChannels,
  setCurrentChannel,
  updateServer,
  getCurrentServer,
  channelsCollection,
} from '../../../../../../backend';

import ChannelItem from './channelItem/ChannelItem.js';

import './Server.css';

function Server() {
  const dispatch = useDispatch();
  const mic = useSelector(isMicOn);
  const currentUser = useSelector(getCurrentUser);
  const currentServer = useSelector(getCurrentServer);

  const channelsQuery = channelsCollection(currentServer.serverID);

  useEffect(() => {
    console.log('useEffect');
    var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
      console.log('Started');

      dispatch(clearChannels());

      snapshot.docChanges().forEach((change) => {
        const channel = {
          channelID: change.doc.id,
          type: change.doc.data().type,
          name: change.doc.data().name,
          category: change.doc.data().category,
        };

        if (change.type === 'added') {
          console.log('New Channel: ', channel.channelID);
          var cs = { ...currentServer };
        
          // if (cs.channels[channel.category] == null) {
          //   console.log('A');
          //   cs.channels[channel.category] = [];
          // } else {
          //   console.log('B');
          // }

          cs.channels[channel.category].concat(channel);
          
          dispatch(updateServer(cs));
        }
        if (change.type === 'modified') {
          console.log('Modified Channel: ', channel.channelID);
          dispatch(updateChannel(channel));
        }
        if (change.type === 'removed') {
          console.log('Removed Channel: ', channel.channelID);
          dispatch(removeChannel(channel));
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddNewChannel = (category) => {
    const name = prompt('Create new channel');

    if (name) {
      channelsCollection(currentServer.serverID).add({
        name: name,
        members: [currentUser.userID],
        type: 'Text',
        category: category,
      });
    }
  };

  return (
    <div className='server'>
      <div className='server__top'>
        <h5>{currentServer.name}</h5>
        <ExpandMoreIcon />
      </div>

      <div className='server__mid'>

        {
          Object.keys(currentServer.channels).map((key, value) => (
            <div key={key} className='server__mid__head'>
              <div className='server__mid__head__drop'>
                <ExpandMoreIcon />
                <h4>{key}</h4>
              </div>
              <AddIcon
                className='server__mid__head__add'
                onClick={() => handleAddNewChannel({ key })}
              />

            </div>
          ))
        }

        {/* <div className='server__mid__channels'>
          {
            currentServer.channels.map((channel) => (
              <ChannelItem
                key={channel.channelID}
                current={currentChannel === channel}
                channel={channel}
              />
            ))
          }
        </div> */}

      </div>

      <div className='server__btm'>
        <Avatar
          className='server__btm__selfie'
          src={currentUser.selfie}
          onClick={() => auth.signOut()}
        />
        <div className='server__btm__texts'>
          <h5>{currentUser.name}</h5>
          <h6>#{currentUser.userID.substring(0, 5)}</h6>
        </div>
        <div className='server__btm__icons'>
          {
            mic ? (
              <MicIcon
                className='server__btm__icons__icon'
                onClick={() => dispatch(setMicOff())}
              />
            ) : (
                <MicOffIcon
                  className='server__btm__icons__icon'
                  onClick={() => dispatch(setMicOn())}
                />
              )
          }
          <HeadsetIcon className='server__btm__icons__icon' />
          <SettingsIcon className='server__btm__icons__icon' />
        </div>
      </div>
    </div>
  );
}

export default Server;
