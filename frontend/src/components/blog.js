import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)
  const toggleInfo = () => {
    setShowAllInfo(!showAllInfo)
  }

  return (
    <>
      {showAllInfo === false ?
        <li key={blog.id}>
          {blog.title} <button onClick={toggleInfo} id="view">view</button> <br></br>
        </li>
        :<li key={blog.id}>
      Title: {blog.title}
          <button onClick={toggleInfo} id="hide">hide</button>
          <button onClick={handleLike} value={blog.id} id="likeButton">I like this!!</button>
          {user.name === blog.user.name && <button onClick={handleRemove} value={blog.id} id="removeButton">Remove</button>} <br></br>
      Author: {blog.author} <br></br>
      Url: {blog.url} <br></br>
      Likes: {blog.likes} <br></br>
      User: {blog.user.name} <br></br>
        </li>}
    </>
  )}
export default Blog