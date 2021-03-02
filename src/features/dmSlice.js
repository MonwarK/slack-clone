import { createSlice } from '@reduxjs/toolkit';

export const dmSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: null,
    userName: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chatId = action.payload.chatId;
      state.userName = action.payload.userName;
    },
    closeChat: (state) => {
      state.chatId = null;
      state.userName = null;
    },
  },
});

export const { setChat, closeChat } = dmSlice.actions;

export const selectChatId = state => state.chat.chatId;
export const selectUserName = state => state.chat.userName;


export default dmSlice.reducer;
