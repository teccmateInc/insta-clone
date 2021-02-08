import React, { useEffect, useState } from 'react'
import { Button, Modal } from '@material-ui/core'
import { auth } from '../../firebase'
// import Loading from '../Loading'
import { Loading } from '../'

const SignUp = ({ open, closeSignUp, classes }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const signUp = (event) => {
    event.preventDefault()
    setLoading(true)
    //create the user and is there is any error it will catch
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        setLoading(false)
        closeSignUp()
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => {
        setLoading(false)
        // alert(error.message)
        setError(error.message)
        // closeSignUp()
      })
    // setOpen(false)
  }

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={open}
        /* when you click outside of the model set the state to be false*/
        onClose={() => closeSignUp()}
      >
        <div className={`${classes.paper} modalStyle`}>
          <form className='signUp'>
            <div className='app_headerImage'>
              <center>
                <img
                  src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                  alt=''
                />
              </center>
            </div>
            <div className='error'>{error}</div>
            <input
              placeholder='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='form-input'
            />
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
            <Button type='submit' onClick={signUp}>
              {' '}
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default SignUp
