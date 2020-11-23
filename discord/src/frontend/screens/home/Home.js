import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../backend/redux/reducers/authReducer';
import firestore from '../../../backend/configs/firebase';
import Servers from './components/servers/Servers';
import Server from './components/server/Server';
import Channel from './components/channel/Channel';

import './Home.css';

function Home() {
    const currentUser = useSelector(getUser);

    const [servers, setServers] = useState([]);
    const [textChannels, setTextChannels] = useState([]);
    const [voiceChannels, setVoiceChannels] = useState([]);

    const [selectedServer, setSelectedServer] = useState();
    const [selectedChannel, setSelectedChannel] = useState();

    useEffect(() => {
        firestore.collection('servers').onSnapshot((ds) => (
            setServers(ds.docs.map(doc => ({
                serverID: doc.id,
                owner: doc.data().owner,
            })))
        ));
        
        if (selectedServer != null)
            firestore.collection('servers').doc(selectedServer).onSnapshot((ds) => (
                ds.data().type === 'voice'
                    ? setVoiceChannels(ds.docs.map(doc => ({
                        channelID: doc.id,
                        type: doc.data().type,
                        users: doc.data().users,
                    })))
                    : setTextChannels(ds.docs.map(doc => ({
                        channelID: doc.id,
                        type: doc.data().type,
                        users: doc.data().users,
                    })))
            ));
    }, [])


    return (
        <div className='home'>
            <Servers
                currentUser={currentUser}
                servers={servers}
                selectedServer={selectedServer === null ? servers.first : servers.first}
                setSelectedServer={(s) => { setSelectedServer(s) }}
            />
            <Server
                currentUser={currentUser}
                selectedServer={selectedServer === null ? servers.first : selectedServer}
                textChannels={textChannels}
                voiceChannels={voiceChannels}
                selectedChannel={selectedChannel}
                setSelectedChannel={(c) => { setSelectedChannel(c) }}
            />
            <Channel
                currentUser={currentUser}
                selectedChannel={selectedChannel}
            />
        </div>
    )
}

export default Home
