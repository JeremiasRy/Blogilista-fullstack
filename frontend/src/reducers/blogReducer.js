import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const initialState = null
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        liker: (state, action) => {
            const newState = state.map(s => s.id !== action.payload.id ? s : action.payload)
            newState.sort((a, b) => b.likes - a.likes)
          return newState
        },
        destroy: (state, action) => {
            return state.filter(s => s.id !== action.payload)
        },
        add: (state, action) => {
            state.push(action.payload)
        },
        setBlogs: (state, action) => {
            action.payload.sort((a,b) => b.likes - a.likes)
            return action.payload
        },
        comment: (state, action) => {
            const newState = state.map(s => s.id !== action.payload.id ? s : action.payload)
            return newState
        }
    }
})

export const { liker, add, destroy, setBlogs, comment } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    } 
}
export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.addBlog(content)
        dispatch(add(newBlog))
    }
}
export const likeMachine = content => {
    return async dispatch => {
        const likedBlog = await blogService.addLike(content)
        dispatch(liker(likedBlog))
    }
}
export const destroyMachine = content => {
    return async dispatch => {
        const removed = await blogService.remove(content)
        dispatch(destroy(removed))
    }
}
export const commentMachine = content => {
    return async dispatch => {
        const commented = await blogService.addComment(content)
        dispatch(comment(commented))
    }
}

export default blogSlice.reducer