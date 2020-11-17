import React from 'react';
import Chat from './chat/Chat';
import Sidebar from './sidebar/Sidebar';
import Users from './users/Users';
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
