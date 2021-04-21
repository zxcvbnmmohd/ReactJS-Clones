import React from "react";
import { useDispatch } from "react-redux";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SettingsIcon from "@material-ui/icons/Settings";

import { setCurrentChannel } from "../../../../../../../backend";

import "./ChannelItem.css";

function ChannelItem({ current, channel }) {
  const dispatch = useDispatch();

  return current ? (
    <div
      className="channelItemCurrent"
      onClick={() => dispatch(setCurrentChannel(channel))}
    >
      <div className="channelItem__channel">
        <span className="channelItem__hash">#</span>
        <span className="channelItem__name">{channel.name}</span>
      </div>
      <div className="channelItem__settings">
        <PersonAddIcon className="channelItem__add_icon" fontSize="small" />
        <SettingsIcon className="channelItem__settings_icon" fontSize="small" />
      </div>
    </div>
  ) : (
    <div
      className="channelItem"
      onClick={() => dispatch(setCurrentChannel(channel))}
    >
      <div className="channelItem__channel">
        <span className="channelItem__hash">#</span>
        <span className="channelItem__name">{channel.name}</span>
      </div>
      <div className="channelItem__settings">
        <PersonAddIcon className="channelItem__add_icon" fontSize="small" />
        <SettingsIcon className="channelItem__settings_icon" fontSize="small" />
      </div>
    </div>
  );
}

export default ChannelItem;
