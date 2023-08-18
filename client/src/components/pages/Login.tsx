import React, { useEffect } from 'react'

function Login() {
  const [loginInfo, setLoginInfo] = React.useState({
    username: "",
    password: ""
  })

  useEffect( () => {
    console.log(loginInfo)
  }, [loginInfo])

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let username = (e.currentTarget.elements.namedItem('username') as HTMLInputElement).value
    let password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value

    setLoginInfo({username, password})
  }

  return (
    <>
      <form onSubmit={ e => handleLogin(e)}>
        <div className="form-group">
          <label>Username</label>
          <input name="username" type="text" className="form-control" placeholder="Username" required/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name="password" type="password" className="form-control" placeholder="Password" required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Login