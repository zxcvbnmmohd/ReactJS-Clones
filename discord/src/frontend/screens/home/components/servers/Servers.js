import React from 'react';
import AddIcon from '@material-ui/icons/Add';

import './Servers.css';

function Servers(props) {
    return (
        <div className="servers">
            <div className="servers__me">
                <h5>ME</h5>
            </div>

            {
                props.servers.map(
                    (server) => props.selectedServer === server
                        ? <div className="servers__selectedServer">

                        </div>
                        : <div className="servers__server" onClick={props.setSelectedServer(server)}>
                            <p>{server.serverID.substring(0, 3)}</p>
                        </div>
                )
            }

            <div className="servers__add">
                <AddIcon />
            </div>
                
        </div>
    )
}

export default Servers
