const Loginform = (props) => {
  return (
    <>
      <h1>Log in</h1>
      <div>
        <form onSubmit={props.handleLogin}>
          <input type="text" id="inputUsername" value={props.username} onChange={({ target }) => props.setUsername(target.value)}></input><br></br>
          <input type="password" id="inputPassword" value={props.password} onChange={({ target }) => props.setPassword(target.value)}></input><br></br>
          <button type="submit" id="loginButton">Log in</button>
        </form>
      </div>
    </>
  )
}

export default Loginform