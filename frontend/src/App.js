import { useEffect } from 'react'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/notification'
import Blog from './components/blog'
import Loginform from './components/loginForm'
import Newblogform from './components/newblog'
import Users from './components/users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { userLogout, setUser } from './reducers/loginReducer'
import blogservice from './services/blogs'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import { Stack } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state => state.login)
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogservice.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())}, [dispatch])
  useEffect(() => {
    dispatch(initializeUsers())}, [dispatch])


  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(userLogout())
    dispatch(setNotification('Logged out', 5))
  }

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  
  const Home = ({user}) => {
    if (user === null || blogs === null) {
      return (
        <div>
        <h1>Welcome!</h1>
        <p>Please <Link to='/login'>login.</Link></p>
        </div>
      )
    }
    const filteredBlogs = blogs.filter(blog => blog.user.name === user.name)
    return (
      <>
      <h1>Hello {user.name}</h1>
      <p>Your blog posts</p>
      <Stack direction='vertical' gap={2}>
      {filteredBlogs.map(blog => <div className="bg-light border" key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
      </Stack>
      </>
    )
  }

  return (
    <div className='container'>
    <Notification />
    {user ? <><Link to='/' style={padding}>Home</Link>
            <Link to='/blogs' style={padding}>Blogs</Link>
            <Link to='/users' style={padding}>Users</Link>
            <Link to='/create' style={padding}>Create blog</Link>
            <Link to='/' onClick={handleLogout}>Log out</Link></>
            
          : <><Link to='/' style={padding}>Home</Link>
            <Link to='login' style={padding} >login</Link></>     
    }    
    <Routes>
      <Route path='/' element={user ? <Home user={user} /> : <Home user={null}/>} />
      <Route path='/blogs' element={user ? <Blog link={Link}/> : <Loginform />} /> 
      <Route path='/users' element={user ? <Users /> : <Loginform />} />     
      <Route path='/login' element={user ? <Home user={user}/> : <Loginform />} />  
      <Route path='/create' element={user ? <Newblogform user={user} /> : <></> }/>
      <Route path='/users/:id' element={<Users userMatch={userMatch}/>} />
      <Route path='/blogs/:id' element={<Blog blogMatch={blogMatch}/>} />
    </Routes>
    </div>
  )}


export default App