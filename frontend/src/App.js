import { useState, useEffect } from 'react'
import Blog from './components/blog'
import Loginform from './components/loginForm'
import Newblogform from './components/newblog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationError from './components/errornotification'
import Notification from './components/notification'
import Togglable from './components/togglable'

const App = () => {
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('username')
  const [password, setPassword] = useState('password')

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    getBlogs()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Log in succesful')
      setTimeout(() => setMessage(null), 5000)
    } catch (exception) {
      setError('wrong username or password')
      setTimeout(() => setError(null), 5000)
    }
  }

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage(`${newBlog.title} added succesfully`)
      setTimeout(() => setMessage(null), 5000)
    } catch (expection) {
      setError('Something went wrong')
      setTimeout(() => setError(null), 5000)
    }
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="Add new blog">
      <Newblogform createBlog={addBlog}></Newblogform>
    </Togglable>
  )

  const handleLike = async (e) => {
    try {
      const blog = await blogService.addLike(e.target.value)
      setMessage(`${blog.title} Liked!!!!`)
      setTimeout(() => setMessage(null), 5000)
      const blogs = await blogService.getAll()
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(blogs)
    } catch (exception) {
      setError('You did something wrong')
      setTimeout(() => setError(null), 5000)
    }
  }

  const handleRemove = async (e) => {
    const blog = blogs.find(blog => blog.id === e.target.value)
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)){
      try {
        const request = await blogService.remove(e.target.value)
        setMessage(`${request} Removed!`)
      } catch (exception) {
        setError('You can only remove your own blogs!')
        setTimeout(() => setError(null), 5000)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setPassword('password')
    setUsername('username')
    setMessage('Logged out')
    setTimeout(() => setMessage(null), 5000)
  }

  return (
    <>
      <NotificationError message={error}></NotificationError>
      <Notification message={message}></Notification>
      {user === null && <Loginform username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}></Loginform>}
      {user !== null && <div>
        <h1>Hello {user.name}</h1>
        {newBlogForm()}
        <h2>blogs</h2>
        <ul>
          {blogs.map(blog =>
            <Blog user={user} key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
          )}
        </ul>
        <button onClick={handleLogout}>Log out</button>
      </div>
      }
    </>
  )}


export default App