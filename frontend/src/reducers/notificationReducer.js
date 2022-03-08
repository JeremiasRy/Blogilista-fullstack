import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
let currentTimer;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        notifi: (state, action) => {
            console.log(action.payload)
            state = action.payload
            return state
        },
        notifiRemove: (state, action) => {
            return null
        },
    }
})

export const { notifi, notifiRemove } = notificationSlice.actions

export const setNotification = (notification, time) => {
    return dispatch => {
      dispatch(notifi(notification))
      clearTimeout(currentTimer)
      currentTimer = setTimeout(() => { dispatch(notifiRemove()) }, time * 1000 )
   }
  }

export default notificationSlice.reducer