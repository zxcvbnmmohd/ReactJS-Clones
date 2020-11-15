import React from 'react';
import './Sidebar.css';
import Channels from './channels/Channels.js';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Mohamed Mohamed's Server</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__mid">
                <div className="sidebar__head">
                    <div className="sidebar__drop">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className='sidebar__add'/>
                </div>
                <div className="sideBar__channels">
                    <Channels channel='youtube'/>
                    <Channels />
                    <Channels />
                    <Channels />
                </div>
            </div>
            

            <div className="sidebar__btm">
                <h3>Mohamed Mohamed</h3>
            </div>

        </div>
    )
}

export default Sidebar
