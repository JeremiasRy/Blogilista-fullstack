import { useSelector, useDispatch } from 'react-redux'
import { likeMachine, destroyMachine, commentMachine } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Stack, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({blog}) => {

  return (
    <>
    <div className="bg-light border"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
    </>
  )
 }

const Blogs = ({blogMatch}) => {
  const commentField = useField('text')
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.login)

  const dispatch = useDispatch()

  const like = (e) => {
    dispatch(likeMachine(e.target.value))
    dispatch(setNotification(`Liked!`, 5))
  }
  const remove = (e) => {
    if (window.confirm('Are you sure you want to remove')) {
      dispatch(destroyMachine(e.target.value))
      dispatch(setNotification(`Removed`, 5))
    }
  }
  const comment = (e) => {
    e.preventDefault()
    const commentObj = {
      comment: commentField.value,
      id: e.target.value
    }
    dispatch(commentMachine(commentObj))
  }

  const blog = blogMatch
  ? blogs && blogs.find(b => b.id === blogMatch.params.id)
  : null

  if (blog) {
    return (
      <>
      <div>
        <h1>{blog.title}</h1>
        by {blog.author}<br/>
        likes {blog.likes} <br/> 
        <Button onClick={like} value={blog.id} id='likeButton'>Like</Button> 
        {user && user.name === blog.user.name ? <Button onClick={remove} value={blog.id} variant="danger">remove</Button> : <></>}
        <h3>Comments</h3>
        <input {...commentField}/> <Button variant='secondary' onClick={comment} value={blog.id}>add comment</Button>
        <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>
      </>
    )
  }


  return (
    <>
    <h3>Blogs</h3>
    <Stack direction='vertical' gap={2}>
    {blogs && blogs.map(blog => 
      <Blog blog={blog} key={blog.id} />)}
    </Stack>
    </>
  )}

export default Blogs