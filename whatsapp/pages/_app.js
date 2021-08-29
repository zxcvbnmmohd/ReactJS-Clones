import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, chatExists } from '.././backend'
import Login from './login.js'

function MyApp({ Component, pageProps }) {
  const [currentUser] = useAuthState(auth)

  if (!currentUser) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
