import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'


const Loginform = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username.value,
      password: password.value
    }
      dispatch(userLogin(user)) 
  }
  
  return (
    <>
      <h1>Log in</h1>
      <div>
        <form onSubmit={handleLogin}>
          <input {...username} placeholder='Username'/><br></br>
          <input {...password} placeholder='Password'/><br></br>
          <Button variant='success' type="submit" id="loginButton">Log in</Button>
        </form>
      </div>
    </>
  )
}

export default Loginform