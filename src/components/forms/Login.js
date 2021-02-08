import React, { useEffect, useState } from 'react'
import { Button, Modal } from '@material-ui/core'
import { auth } from '../../firebase'
// import Loading from '../Loading'
import { Loading } from '../'

const Login = ({ open, closeLogin, classes }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loginUser = (event) => {
    event.preventDefault()
    setLoading(true)
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        setLoading(false)
        closeLogin()
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
        // alert(error.message)
      })
  }

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={open}
        /* when you click outside of the model set the state to be false*/
        onClose={() => closeLogin()}
      >
        <div className={`${classes.paper} modalStyle`}>
          <form className='signUp'>
            <center>
              <img
                className='app_headerImage'
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt=''
              />
            </center>
            <div className='error'>{error}</div>
            <input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-input'
            />
            <input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-input'
            />
            <Button type='submit' onClick={loginUser}>
              {' '}
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Login
