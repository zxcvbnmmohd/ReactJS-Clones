import React from 'react';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import './Home.css';

function Home() {
    return (
        <div className='home'>
            <Users />
            <Sidebar />
            <Chat />
        </div>
    )
}

export default Home
