import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
	auth,
	getCurrentUser,
	setCurrentUser,
	nullCurrentUser,
	readCurrentUserDocument,
} from "../backend"

import { Auth, Home } from "../frontend/screens"

import "./App.css"

function App() {
	const dispatch = useDispatch()
	const currentUser = useSelector(getCurrentUser)

	useEffect(() => {
		auth.onAuthStateChanged(async (onUser) => {
			if (onUser) {
				const doc = await readCurrentUserDocument()

				dispatch(
					setCurrentUser({
						userID: doc.id,
						selfie: doc.data().selfie,
						email: doc.data().email,
						name: doc.data().name,
					})
				)
			} else {
				dispatch(nullCurrentUser())
			}
		})
	}, [])

	return (
		<div className="app">
			{
				currentUser
					? <Home />
					: <Auth />
			}
		</div>
	)
}

export default App
