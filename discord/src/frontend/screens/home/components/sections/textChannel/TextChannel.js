import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import GifIcon from '@material-ui/icons/Gif'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import RedeemIcon from '@material-ui/icons/Redeem'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

import { firebase, firestore, getCurrentUser, getCurrentChannel, getCurrentServer } from '../../../../../../backend'

import Message from './message/Message.js'

import './TextChannel.css'

function TextChannel() {
	const currentUser = useSelector(getCurrentUser)
	const currentChannel = useSelector(getCurrentChannel)
	const currentServer = useSelector(getCurrentServer)
	const [msg, setMsg] = useState('')

	const msgsCollection = firestore.collection('servers').doc(currentServer.serverID).collection(currentChannel.category).doc(currentChannel.channelID).collection('messages')
	const msgsQuery = msgsCollection.orderBy('createdAt')

	const [messages] = useCollectionData(msgsQuery, { idField: 'msgID' })

	const onSubmit = async (e) => {
		e.preventDefault()

		if (msg) {
			await msgsCollection.add({
				ownerID: currentUser.userID,
				type: 'text',
				msg: msg,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			})

			setMsg('')
		}
	}

	return (
		<div className='textChannel'>
			<div className='textChannel__head'>
				<div className='textChannel__head__title'>
					<h5>
						{currentChannel.type === 'text'
							? <span className="channel__head__icon">#</span>
							: <VolumeUpIcon className="channel__head__icon" />}
						{currentChannel.name}
					</h5>
				</div>
				<div className='textChannel__head__actions'>
					<NotificationsIcon />
					<BookmarkIcon />
					<PeopleAltIcon />
				</div>
			</div>

			<div className='textChannel__messages'>
				{
					messages && messages.map((msg) => <Message key={msg.msgID} msg={msg.msg} />)
				}
			</div>

			<div className='textChannel__textField'>
				<AddCircleIcon />

				<form onSubmit={onSubmit}>
					<input placeholder={'Message #' + currentChannel.name} type='text' value={msg} onChange={(e) => setMsg(e.target.value)} />
					<button className='textChannel__textField__button' type='submit' disabled={!msg}>Send</button>
				</form>

				<div className='textChannel__textField__options'>
					<RedeemIcon />
					<GifIcon />
					<EmojiEmotionsIcon />
				</div>
			</div>
		</div>
	)
}

export default TextChannel
