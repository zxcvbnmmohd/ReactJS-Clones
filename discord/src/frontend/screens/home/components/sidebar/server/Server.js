import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import SettingsIcon from "@material-ui/icons/Settings";

import {
  auth,
  isMicOn,
  setMicOn,
  setMicOff,
  setCurrentChannel,
  getCurrentChannel,
  getCurrentUser,
  getCurrentServer,
  channelsCollection,
} from "../../../../../../backend";

import Category from "./category/Category.js";

import "./Server.css";

function Server() {
  const dispatch = useDispatch();

  const mic = useSelector(isMicOn);
  const currentUser = useSelector(getCurrentUser);
  const currentServer = useSelector(getCurrentServer);
//   const currentChannel = useSelector(getCurrentChannel);

  const [channels, setChannel] = useState([]);

  const addChannel = (key, c) => {
    setChannel((arr) => [
      ...arr,
      { key: key, name: c.category, channels: [c] },
    ]);
  };

  const clearChannels = () => {
    setChannel([]);
  };

//   useEffect(() => {
//     console.log("useEffect");

//     currentServer.categories.forEach(function (c) {
//       const channelsQuery = channelsCollection(currentServer.serverID, c);

//       var i = 0;
//       var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
//         console.log("Started");
//         console.log(c);
//         clearChannels();

//         snapshot.docChanges().forEach((change) => {
//           const channel = {
//             channelID: change.doc.id,
//             type: change.doc.data().type,
//             name: change.doc.data().name,
//             category: change.doc.data().category,
//             isPrimary: change.doc.data().isPrimary,
//           };

//           if (change.type === "added") {
//             addChannel(i, channel);
//             if (channel.isPrimary) dispatch(setCurrentChannel(channel));
//             i++;
//           }
//           if (change.type === "modified") {
//             console.log("Modified Category: ", channel.category);
//           }
//           if (change.type === "removed") {
//             console.log("Removed Category: ", channel.category);
//           }
//         });

//         console.log("STATE: ", channels);
//       });

//       return () => {
//         unsubscribe();
//       };
//     });
//   }, [currentServer]);

  const handleAddNewChannel = (category) => {
    const name = prompt("Create new Channel");

    if (name) {
      channelsCollection(currentServer.serverID).add({
        name: name,
        members: [currentUser.userID],
        type: "Text",
        category: category,
      });
    }
  };

  return (
    <div className="server">
      <div className="server__top">
        <h5>{currentServer.name}</h5>
        <ExpandMoreIcon />
      </div>

      <div className="server__mid">
        {currentServer.categories.map((category) => {
          return <div key={category}>
			  <Category category={category} />
		  </div>;
        })}
        <div className="server__mid__head">
          <div className="server__mid__head__drop">
            <h4>Create New Category</h4>
          </div>
          <AddIcon
            className="server__mid__head__add"
            onClick={() => handleAddNewChannel("")}
          />
        </div>
      </div>

      <div className="server__btm">
        <Avatar
          className="server__btm__selfie"
          src={currentUser.selfie}
          onClick={() => auth.signOut()}
        />
        <div className="server__btm__texts">
          <h5>{currentUser.name}</h5>
          <h6>#{currentUser.userID.substring(0, 5)}</h6>
        </div>
        <div className="server__btm__icons">
          {mic ? (
            <MicIcon
              className="server__btm__icons__icon"
              onClick={() => dispatch(setMicOff())}
            />
          ) : (
            <MicOffIcon
              className="server__btm__icons__icon"
              onClick={() => dispatch(setMicOn())}
            />
          )}
          <HeadsetIcon className="server__btm__icons__icon" />
          <SettingsIcon className="server__btm__icons__icon" />
        </div>
      </div>
    </div>
  );
}

export default Server;
