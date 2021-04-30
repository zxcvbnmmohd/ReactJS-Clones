import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from "@material-ui/icons/Add"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import {
	fieldValues,
	setCurrentChannel,
	getCurrentChannel,
	getCurrentServer,
	serverDocument,
	channelsCollection,
	channelsQuery,
} from "../../../../../../../backend"

import ChannelItem from "./channelItem/ChannelItem.js"

import "./Category.css"

function Category({ category }) {
	const dispatch = useDispatch()
	const currentServer = useSelector(getCurrentServer)
	const currentChannel = useSelector(getCurrentChannel)
	const [channels, setChannel] = useState([])

	const addChannel = (c) => {
		setChannel((arr) => [
			...arr,
			c,
		])
	}

	const clearChannels = () => {
		setChannel([])
	}

	// const channelsQuery = channelsCollection(currentServer.serverID, category)

	useEffect(() => {
		console.log("useEffect")

		// var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
		// 	console.log("Started")
		// 	console.log(category)

		// 	clearChannels()

		// 	snapshot.docChanges().forEach((change) => {
		// 		const channel = {
		// 			channelID: change.doc.id,
		// 			type: change.doc.data().type,
		// 			name: change.doc.data().name,
		// 			category: change.doc.data().category,
		// 			isPrimary: change.doc.data().isPrimary,
		// 		}

		// 		if (change.type === "added") {
		// addChannel(channel)
		// if (channel.isPrimary) dispatch(setCurrentChannel(channel))
		// 		}
		// 		if (change.type === "modified") {
		// 			console.log("Modified Category: ", channel.category)
		// 		}
		// 		if (change.type === "removed") {
		// 			console.log("Removed Category: ", channel.category)
		// 		}
		// 	})

		// 	console.log("STATE: ", channels)
		// })

		const unsubscribe = channelsQuery(
			currentServer.serverID,
			category,
			(channel) => {
				addChannel(channel)
				if (channel.isPrimary) dispatch(setCurrentChannel(channel))
			},
			(channel) => { },
			(channel) => { },
		)

		return () => {
			unsubscribe()
		}
	}, [currentServer])

	const handleAddNewChannel = () => {
		const channel = prompt("Create new Channel")

		if (channel) {
			const now = fieldValues.serverTimestamp()

			serverDocument(currentServer.serverID).update({
				updatedAt: now,
			}).then((ref) => {
				channelsCollection(currentServer.serverID, category).add({
					category: category,
					name: channel,
					type: currentChannel.type,
					isPrimary: false,
					createdAt: now,
					updatedAt: now,
				})
			})
		}
	}

	return (
		<div className="category">
			<div className="category__mid__head">
				<div className="category__mid__head__drop">
					<ExpandMoreIcon />
					<h4>{category}</h4>
				</div>
				<AddIcon
					className="category__mid__head__add"
					onClick={() => handleAddNewChannel({ category })}
				/>
			</div>

			{
				channels.map((channel) => {
					return (
						<div key={channel.channelID}>
							<ChannelItem
								current={
									currentChannel === null
										? false
										: currentChannel.channelID === channel.channelID
								}
								channel={channel}
							/>
						</div>
					)
				})
			}
		</div>
	)
}

export default Category
