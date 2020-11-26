import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import firestore, { auth } from "../../../../../../backend/configs/firebase";
import { isMicOn, setMicOn, setMicOff, getCurrentPage, setCurrentPage, } from "../../../../../../backend/redux/reducers/appReducer";
import { getCurrentUser } from "../../../../../../backend/redux/reducers/authReducer";

import { Avatar } from "@material-ui/core";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AddIcon from "@material-ui/icons/Add";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

import "./Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const currentPage = useSelector(getCurrentPage);
  const mic = useSelector(isMicOn);

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <form onSubmit={(e) => { }}>
          <input placeholder="Find or start a conversation" />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="dashboard__mid">
        <div className="dashboard__mid__actions">
          <div
            className={
              currentPage === "Friends"
                ? "dashboard__mid__actions__actionActive"
                : "dashboard__mid__actions__action"
            }
            onClick={() => dispatch(setCurrentPage("Friends"))}
          >
            <SupervisorAccountIcon
              className="server__mid__actions__action__icon"
            />
            <h4>Friends</h4>
          </div>

          <div
            className={
              currentPage === "Settings"
                ? "dashboard__mid__actions__actionActive"
                : "dashboard__mid__actions__action"
            }
            onClick={() => dispatch(setCurrentPage("Settings"))}
          >
            <SettingsIcon
              className="server__mid__actions__action__icon"
            />
            <h4>Settings</h4>
          </div>
        </div>

        <div className="dashboard__mid__dms">
          <h5>Direct Messages</h5>
          <AddIcon
            className="server__mid__dms__add"
          />
        </div>

        {/* <div className="dashboard__mid__channels">
          {textChannels.map((channel) => (
            <Channels
              key={channel.channelID}
              current={currentChannel === channel}
              channel={channel.name}
            />
          ))}
        </div> */}
      </div>

      <div className="dashboard__btm">
        <Avatar
          className="dashboard__btm__selfie"
          src={user.selfie}
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className="dashboard__btm__texts">
          <h5>{user.name}</h5>
          <h6>#{user.userID.substring(0, 5)}</h6>
        </div>
        <div className="dashbaord__btm__icons">
          {
            mic
              ? <MicIcon className="dashboard__btm__icons__icon" onClick={() => dispatch(setMicOff())} />
              : <MicOffIcon className="dashboard__btm__icons__icon" onClick={() => dispatch(setMicOn())} />
          }
          <HeadsetIcon className="dashboard__btm__icons__icon" />
          <SettingsIcon className="dashboard__btm__icons__icon" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
