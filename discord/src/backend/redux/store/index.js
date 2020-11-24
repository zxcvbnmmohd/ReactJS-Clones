import { configureStore } from '@reduxjs/toolkit';
import { authReducer, serversReducer, channelsReducer } from '../reducers';

export default configureStore({
  reducer: {
    auth: authReducer,
    servers: serversReducer,
    channels: channelsReducer,
  },
});
