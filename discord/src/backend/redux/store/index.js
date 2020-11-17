import { configureStore } from '@reduxjs/toolkit';
import { authReducer, channelReducer } from '../reducers';

export default configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
  },
});
