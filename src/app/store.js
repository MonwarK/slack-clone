import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import channelReducer from "../features/channelSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer
  },
});
