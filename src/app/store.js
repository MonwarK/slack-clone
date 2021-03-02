import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import channelReducer from "../features/channelSlice";
import chatReducer from "../features/dmSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    chat: chatReducer
  },
});
