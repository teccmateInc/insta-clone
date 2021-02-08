import React, { useState, useEffect } from 'react'
import './assets/styles/App.css'
import { auth, db } from './firebase'
import { makeStyles } from '@material-ui/core/styles'
import {
  Header,
  Footer,
  Loading,
  Post,
  Story as Stories,
  ImageLoad,
} from './components'
// import ImageLoad from './components/ImageLoad'
// import Stories from './components/Stories'
// import Loading from './components/Loading'
// import Header from './components/Header'
// import Footer from './components/Footer'

/* Stylying from Material UI library*/
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

{
  /*  component that  handle the page */
}
function App() {
  const classes = useStyles()

  {
    /* setting variable in react, creating an array of posts , useeffect run a piece of code based on a specific condition*/
  }
  const [posts, setPost] = useState([])
  const [user, setUser] = useState(null)
  const [signIn, setSignIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadTime, setLoadTime] = useState(false)
  const [imagePost, imagePostIn] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // if user has logged in ..
        console.log(authUser)
        console.log('if onAuthStateChanged')
        setUser(authUser)
      } else {
        console.log('else onAuthStateChanged')
        // user has logged out
        setUser(null)
      }
    })
    return () => {
      // peform action
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    //everytime the page refreshes load this page
    let currentTime = new Date()
    posts.length === 0 && setLoading(true)
    db.collection('posts')
      .orderBy('timestamp')
      .onSnapshot((snapshot) => {
        //everytime a new post is added , this code fires
        setLoading(false)
        let afterFetch = new Date()
        let totalTime = Math.abs(afterFetch - currentTime)
        setLoadTime(Math.ceil(totalTime / 1000))
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id, //post id
            post: doc.data(), //getting the doc and the data from the doc
          }))
        )
      })
  }, [])

  const handleTimeOfPosting = (time) => {
    imagePostIn(time)
    setTimeout(() => {
      imagePostIn(null)
    }, 3000)
  }

  return (
    <div className='App'>
      <Header
        user={user}
        classes={classes}
        openSignIn={signIn}
        onCloseSignIn={() => setSignIn(false)}
      />
      {loadTime && (
        <div className='loaded'>
          Load {`${posts.length} posts in ${loadTime} seconds`}
          {imagePost && (
            <div className='popup'>
              Image post in {imagePost} seconds
              {/* {setTimeout(() =>  imagePostIn(null), 3000)} */}
            </div>
          )}
        </div>
      )}
      <div className='posts_app'>
        <div className='posts'>
          <Stories />
          {
            ({
              /*Mapping through the post list and output the content*/
            },
            loading ? (
              <Loading />
            ) : (
              <>
                {posts.map(({ id, post }) => (
                  <Post
                    key={id}
                    postId={id}
                    user={user}
                    username={post.username}
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                  />
                ))}
              </>
            ))
          }
          {user?.displayName && (
            <ImageLoad
              username={user.displayName}
              imagePostIn={(time) => handleTimeOfPosting(time)}
            />
          )}
        </div>
      </div>
      <Footer
        user={user}
        noOfPosts={posts.length}
        openSignIn={() => setSignIn(true)}
      />
    </div>
  )
}

export default App
