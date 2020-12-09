import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
// import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import {
  getServers,
  setCurrentServer,
  getCurrentServer,
} from '../../../../../backend';

import './Servers.css';

function Servers() {
  const dispatch = useDispatch();
  const servers = useSelector(getServers);
  const currentServer = useSelector(getCurrentServer);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='servers'>
      <div className='holder'>
        {currentServer === null ? (
          <div className='line'></div>
        ) : (
          <div className='space'></div>
        )}

        <div
          className='servers__me'
          onClick={() => dispatch(setCurrentServer(null))}
        >
          <h5>ME</h5>
        </div>

        <div className='space'></div>
      </div>

      {servers.map((server) => {
        return (
          <div key={server.serverID} className='holder'>
            {currentServer === null ? (
              <div className='space'></div>
            ) : currentServer.serverID === server.serverID ? (
              <div className='dot'></div>
            ) : (
              <div className='space'></div>
            )}

            <div
              className='servers__server'
              onClick={() => dispatch(setCurrentServer(server))}
            >
              <p>{server.serverID.substring(0, 3)}</p>
            </div>

            <div className='space'></div>
          </div>
        );
      })}

      <div className='servers__add' onClick={handleOpen}>
        <AddIcon />
        <Modal open={open} onClose={handleClose}>
          <div>
            Hello
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Servers;
