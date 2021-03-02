import { createSlice } from '@reduxjs/toolkit';

export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channelId: null,
    channelName: null,
    channelUsers: [],
  },
  reducers: {
    setChannel: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
      state.channelUsers = action.payload.channelUsers;
    },
  },
});

export const { setChannel } = channelSlice.actions;

export const selectChannelId = state => state.channel.channelId;
export const selectChannelName = state => state.channel.channelName;
export const selectChannelUsers = state => state.channel.channelUsers;


export default channelSlice.reducer;
