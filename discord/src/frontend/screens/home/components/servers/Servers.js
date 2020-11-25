import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
// import { getCurrentUser } from "../../../../../backend/redux/reducers/authReducer";
import {
  getServers,
  setCurrentServer,
  getCurrentServer,
} from "../../../../../backend/redux/reducers/serversReducer";

import "./Servers.css";

function Servers() {
  const dispatch = useDispatch();
  const servers = useSelector(getServers);
  const currentServer = useSelector(getCurrentServer);

  return (
    <div className="servers">
      <div className="holder">
        {
          currentServer === null ? <div className="line"></div> : <div className="space"></div>
        }
        
        <div className="servers__me" onClick={() => dispatch(setCurrentServer(null))} >
          <h5>ME</h5>
        </div>

        <div className="space"></div>
      </div>


      {
        servers.map((server) => {
          return (
            <div className="holder">
              {
                currentServer === null ? <div className="space"></div> : currentServer.serverID === server.serverID ? <div className="dot"></div> : <div className="space"></div>
              }

              <div key={server.serverID} className="servers__server" onClick={() => dispatch(setCurrentServer(server))} >
                <p>{server.serverID.substring(0, 3)}</p>
              </div>

              <div className="space"></div>
            </div>
          );
        })
      }

      <div className="servers__add">
        <AddIcon />
      </div>
    </div>
  );
}

export default Servers;
