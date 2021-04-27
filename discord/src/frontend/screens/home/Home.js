import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getCurrentPage,
	getCurrentUser,
	getCurrentChannel,
	addServer,
	updateServer,
	removeServer,
	clearServers,
	getCurrentServer,
	serversCollection,
} from '../../../backend/';

import Friends from './components/sections/friends/Friends';
import TextChannel from './components/sections/textChannel/TextChannel';
import VoiceChannel from './components/sections/voiceChannel/VoiceChannel';
import Dashboard from './components/sidebar/dashboard/Dashboard';
import Server from './components/sidebar/server/Server';
import Servers from './components/servers/Servers';
import Settings from './components/sections/settings/Settings';

import './Home.css';

function Home() {
	const dispatch = useDispatch();
	const currentUser = useSelector(getCurrentUser);
	const currentPage = useSelector(getCurrentPage);
	const currentServer = useSelector(getCurrentServer);
	const currentChannel = useSelector(getCurrentChannel);

	const serversQuery = serversCollection().where(
		'membersIDs',
		'array-contains-any',
		[currentUser.userID]
	);

	useEffect(() => {
		console.log('useEffect');
		dispatch(clearServers([]));

		const unsubscribe = serversQuery.onSnapshot((snapshot) => {
			console.log('Started');

			snapshot.docChanges().forEach((change) => {
				const server = {
					serverID: change.doc.id,
					ownerID: change.doc.data().ownerID,
					name: change.doc.data().name,
					membersIDs: change.doc.data().members,
					categories: change.doc.data().categories,
					channels: {},
				};

				if (change.type === 'added') {
					console.log('New Server: ', server.serverID);
					dispatch(addServer(server));
				}
				if (change.type === 'modified') {
					console.log('Modified Server: ', server.serverID);
					dispatch(updateServer(server));
				}
				if (change.type === 'removed') {
					console.log('Removed Server: ', server.serverID);
					dispatch(removeServer(server));
				}
			});
		});

		return () => {
			unsubscribe();
		};
	}, []);

	function renderScreen(param) {
		switch (param) {
			case 'Friends':
				return <Friends />;
			default:
				return <Settings />;
		}
	}

	return (
		<div className='home'>
			<Servers />
			{
				currentServer === null
					? <Dashboard />
					: <Server />
			}
			{
				currentServer === null
					? renderScreen(currentPage)
					: currentChannel === null
						? <></>
						: currentChannel.type === 'text' ? <TextChannel /> : <VoiceChannel />
			}
		</div>
	);
}

export default Home;
