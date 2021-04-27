import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Modal from '@material-ui/core/Modal';
// import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import {
	fieldValues,
	serversCollection,
	channelsCollection,
	getServers,
	setCurrentServer,
	getCurrentServer,
	getCurrentUser,
} from '../../../../../backend';

import './Servers.css';

function Servers() {
	const dispatch = useDispatch();
	const servers = useSelector(getServers);
	const currentServer = useSelector(getCurrentServer);
	const currentUser = useSelector(getCurrentUser);

	const handleOpen = () => {
		// setOpen(true);
		const name = prompt('Create your server\nYour server is where you and your friends hang out. Make yours and start talking.');
		const now = fieldValues.serverTimestamp();

		if (name) {
			serversCollection().add({
				ownerID: currentUser.userID,
				membersIDs: [currentUser.userID,],
				categories: [
					'Text Channel',
					'Voice Channel',
				],
				name: name,
				createdAt: now,
				updatedAt: now,
			}).then((ref) => {
				channelsCollection(ref.id, 'Text Channel').add({
					category: 'Text Channel',
					name: 'General',
					type: 'text',
					isPrimary: true,
					createdAt: now,
					updatedAt: now,
				});
				channelsCollection(ref.id, 'Voice Channel').add({
					category: 'Voice Channel',
					name: 'General',
					type: 'voice',
					isPrimary: false,
					createdAt: now,
					updatedAt: now,
				});
			});
		}
	};

	// const handleClose = () => {
	//   // setOpen(false);
	// };

	return (
		<div className='servers'>
			<div className='holder'>
				{
					currentServer === null
						? <div className='line'></div>
						: <div className='space'></div>
				}

				<div className='servers__me' onClick={() => dispatch(setCurrentServer(null))}>
					<h5>ME</h5>
				</div>

				<div className='space'></div>
			</div>

			{
				servers.map((server) => {
					return (
						<div key={server.serverID} className='holder'>
							{
								currentServer === null
									? <div className='space'></div>
									: currentServer.serverID === server.serverID
										? <div className='dot'></div>
										: <div className='space'></div>
							}

							<div className='servers__server' onClick={() => dispatch(setCurrentServer(server))}>
								<p>{server.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}</p>
							</div>

							<div className='space'></div>
						</div>
					);
				})
			}

			<div className='servers__add' onClick={handleOpen}>
				<AddIcon />
			</div>
		</div>
	);
}

export default Servers;
