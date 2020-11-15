import React from 'react';
import Chat from '../components/chat/Chat';
import Users from '../components/users/Users';
import Sidebar from '../components/sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Users />
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
