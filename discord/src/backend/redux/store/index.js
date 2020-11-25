import { configureStore } from '@reduxjs/toolkit';
import { appReducer, authReducer, serversReducer, channelsReducer } from '../reducers';

export default configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    servers: serversReducer,
    channels: channelsReducer,
  },
});
