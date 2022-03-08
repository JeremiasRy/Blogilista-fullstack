import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import { setNotification } from "./notificationReducer";


const initialState = null;

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        logout: (state, action) => {
            return null
        },
    }
})

export const { setUser, logout } = loginSlice.actions

export const userLogin = content => {
    return async dispatch => {
       try {
        const user = await loginService.login(content)
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
        dispatch(setUser(user))
        dispatch(setNotification('logged in!', 5))
    } catch (error) {
        dispatch(setNotification('Wrong username or password', 5))
    }
       
    }
}
export const userLogout = () => {
    return async dispatch => {
        dispatch(logout())
    }
}


export default loginSlice.reducer