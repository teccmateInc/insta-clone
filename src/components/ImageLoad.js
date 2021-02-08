import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { storage, db } from '../firebase'
import firebase from 'firebase'
import '../assets/styles/PhotoUpload.css'

export function ImageLoad({ username, imagePostIn }) {
  const [caption, addCaption] = useState('')
  const [progress, setProgressBar] = useState(0)
  const [image, setPhoto] = useState(null)
  // const [loadTime, setLoadTime] = useState(false)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  // progress bar function
  const handleLoad = () => {
    let currentTime = new Date()
    const uploadJob = storage.ref(`images/${image.name}`).put(image)

    uploadJob.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgressBar(progress)
      },

      (error) => {
        //handle error
        console.log(error)
        alert(error.message)
      },
      // getting the download link
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //adding image to DB
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), //sort posts from correct timing
              caption: caption,
              imageUrl: url,
              username: username,
            })
            // when the upload is done set clean progress
            let afterFetch = new Date()
            let totalTime = Math.abs(afterFetch - currentTime)
            imagePostIn(Math.ceil(totalTime / 1000)) //callback
            setProgressBar(0)
            addCaption('')
            setPhoto(null)
          })
      }
    )
  }

  return (
    <div className='photo_upload'>
      <br></br>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginLeft: '8px' }}>
          {progress > 0 && `${progress}%`}
        </div>
        <progress
          style={{ width: '100%', height: '30px' }}
          value={progress}
          max='100'
        />
      </div>
      <input
        type='text'
        placeholder='Enter a caption'
        onChange={(event) => addCaption(event.target.value)}
        value={caption}
      />
      <input type='file' accept='image/*' onChange={handleChange} />
      <Button disabled={image ? false : true} onClick={handleLoad}>
        Upload
      </Button>
    </div>
  )
}
