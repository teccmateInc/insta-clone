import React from 'react'
import { Button } from '@material-ui/core'

export function Footer({ user, noOfPosts, openSignIn }) {
  return (
    <>
      {!user && (
        <div
          className='footer'
          style={{ position: noOfPosts === 0 ? 'fixed' : 'sticky' }}
        >
          <h3>PLEASE LOGIN TO UPLOAD :) </h3>
          <Button onClick={() => openSignIn()}>Login here</Button>
        </div>
      )}
    </>
  )
}
