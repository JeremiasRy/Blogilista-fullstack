import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const usersSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        setUsers: (state, action) => {
            return action.payload
        }
    }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
            const usersList = await userService.getUsers()
            dispatch(setUsers(usersList))
    }
}

export default usersSlice.reducer