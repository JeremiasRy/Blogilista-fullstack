import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogservice from '../services/blogs'
import { Button } from 'react-bootstrap'

const Newblogform = ({user}) => {

  blogservice.setToken(user.token)
  const dispatch = useDispatch()
  
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`${title.value} added!`, 5))
    handleReset()
  }

  const handleReset = () => {
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <>
      <h1>Addblog</h1>
      <div>
        <form onSubmit={addBlog} onReset={handleReset}>
          <input {...title} placeholder='Title'/><br></br>
          <input {...author} placeholder='Author'/><br></br>
          <input {...url} placeholder='URL'/><br></br>
          <Button variant='success' type="submit" id="addButton">Add</Button><Button type="reset">reset</Button>
        </form>
      </div>
    </>
  )
}

export default Newblogform