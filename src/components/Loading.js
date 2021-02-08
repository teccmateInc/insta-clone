import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: '#fff',
  },
}))

export function Loading({ progress = '' }) {
  console.log('Loading', progress)
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Box position='relative' display='inline-flex'>
        <CircularProgress
          variant={progress ? 'determinate' : 'indeterminate'}
          color='inherit'
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position='absolute'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {progress && (
            <Typography
              variant='caption'
              component='div'
              color='inherit'
            >{`${Math.round(progress)}%`}</Typography>
          )}
        </Box>
      </Box>
    </Backdrop>
  )
}
