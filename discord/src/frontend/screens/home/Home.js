import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	getCurrentPage,
	getCurrentChannel,
	addServer,
	updateServer,
	removeServer,
	clearServers,
	getCurrentServer,
	serversQuery,
} from '../../../backend/'

import Friends from './components/sections/friends/Friends'
import TextChannel from './components/sections/textChannel/TextChannel'
import VoiceChannel from './components/sections/voiceChannel/VoiceChannel'
import Dashboard from './components/sidebar/dashboard/Dashboard'
import Server from './components/sidebar/server/Server'
import Servers from './components/servers/Servers'
import Settings from './components/sections/settings/Settings'

import './Home.css'

function Home() {
	const dispatch = useDispatch()
	const currentPage = useSelector(getCurrentPage)
	const currentServer = useSelector(getCurrentServer)
	const currentChannel = useSelector(getCurrentChannel)

	useEffect(() => {
		console.log('useEffect')
		dispatch(clearServers([]))

		const unsubscribe = serversQuery(
			(server) => {
				dispatch(addServer(server))
			},
			(server) => {
				dispatch(updateServer(server))
			},
			(server) => {
				dispatch(removeServer(server))
			},
		)

		return () => {
			unsubscribe()
		}
	}, [])

	function renderScreen(param) {
		switch (param) {
			case 'Friends':
				return <Friends />
			default:
				return <Settings />
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
	)
}

export default Home
