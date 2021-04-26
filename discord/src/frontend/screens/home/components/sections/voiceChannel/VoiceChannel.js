import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firebase, firestore, getCurrentUser, getCurrentChannel, getCurrentServer } from '../../../../../../backend';

import './VoiceChannel.css';

function VoiceChannel() {
	const currentUser = useSelector(getCurrentUser);
	const currentChannel = useSelector(getCurrentChannel);
	const currentServer = useSelector(getCurrentServer);

	return (
		<div className='voiceChannel'>
			
		</div>
	)
}

export default VoiceChannel
