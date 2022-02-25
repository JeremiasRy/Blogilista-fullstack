import React, { useState } from 'react'
const Newblogform = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: 'Title', author: 'Author', url: 'Url' })

  const addBlog = (e) => {
    e.preventDefault()
    createBlog(newBlog)
    setNewBlog({ ...newBlog, title: 'title', author: 'author', url: 'url' })
  }

  return (
    <>
      <h1>Addblog</h1>
      <div>
        <form onSubmit={addBlog}>
          <input type="text" id="title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}></input><br></br>
          <input type="text" id="author" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}></input><br></br>
          <input type="text" id="url"value={newBlog.url} onChange={e => setNewBlog({ ...newBlog, url: e.target.value })}></input><br></br>
          <button type="submit" id="addButton">Add</button>
        </form>
      </div>
    </>
  )
}

export default Newblogform