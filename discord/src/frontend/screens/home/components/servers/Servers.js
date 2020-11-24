import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
// import { getUser } from "../../../../../backend/redux/reducers/authReducer";
import {
    getServers,
    setCurrentServer,
    getCurrentServer
} from "../../../../../backend/redux/reducers/serversReducer";

import './Servers.css';

function Servers() {
    const dispatch = useDispatch();
    const servers = useSelector(getServers);
    const currentServer = useSelector(getCurrentServer);


    return (
        <div className="servers">
            <div className="servers__me">
                <h5>ME</h5>
            </div>

            {
                servers.map(
                    (server) => {
                        console.log("Servers...");
                        console.log(currentServer.serverID);
                        return currentServer.serverID === server.serverID
                            ? <div key={server.serverID} className="servers__selectedServer">
                                <p>{server.serverID.substring(0, 3)}</p>
                            </div>
                            : <div key={server.serverID} className="servers__server" onClick={() => dispatch(setCurrentServer(server))}>
                                <p>{server.serverID.substring(0, 3)}</p>
                            </div>
                    }
                )
            }

            <div className="servers__add">
                <AddIcon />
            </div>

        </div>
    )
}

export default Servers
