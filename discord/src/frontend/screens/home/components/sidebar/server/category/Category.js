import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from "@material-ui/icons/Add"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import {
	fieldValues,
	addChannel,
	updateChannel,
	removeChannel,
	getChannels,
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
	const channels = useSelector(getChannels)

	useEffect(() => {
		console.log("useEffect")

		const unsubscribe = channelsQuery(
			currentServer.serverID,
			category,
			(channel) => {
				if (!channels.some(c => c.channelID === channel.channelID)) dispatch(addChannel(channel))
				if (channel.isPrimary) dispatch(setCurrentChannel(channel))
			},
			(channel) => {
				dispatch(updateChannel(channel))
			},
			(channel) => {
				dispatch(removeChannel(channel))
			},
		)

		return () => {
			unsubscribe()
		}
	}, [channels])

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
				channels.filter(channel => channel.category.includes(category)).map((channel) => {
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
