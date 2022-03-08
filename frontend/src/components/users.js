import { Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    return (
        <div className="bg-light border">
        <Link to={`/users/${user.id}`}>{user.name}</Link> blogs: {user.blogs.length}
        </div>
    )
}

const Users = ({userMatch}) => {
    const users = useSelector(state => state.users)
    const user = userMatch
    ? users && users.find(user => user.id === userMatch.params.id)
    : null

    if (user) {
        return (
            <>
            <h1>{user.name}</h1>
            <p>Blog posts: </p>
            <Stack direction='vertical' gap={2}>
              {user.blogs.map(blog => <div className="bg-light border" key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>)}
            </Stack>
            </>
        )
    }
    return (
        <Stack direction='vertical' gap={2}>
        {users && users.map(user => 
            <User key={user.id} user={user} />)}
        </Stack>   
 )
}

export default Users
