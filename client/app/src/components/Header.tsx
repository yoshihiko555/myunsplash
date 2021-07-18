import React, { useState, useContext } from 'react'
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import {
  SearchBox,
  AddPhotoDialog,
  AuthDialog,
} from './index'
import {
  AuthContext
} from '../contexts'
import { auth } from '../assets/ts/firebase'
import styles from '../assets/scss/header.module.scss'

const Header: React.FC = () => {
  const { isAuth } = useContext(AuthContext)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  const signout = () => {
    auth.signOut()
  }

  return (
    <div className={styles.root}>
      <AppBar className={styles.bar} color='transparent' position='static'>
        <Toolbar>
          <Typography variant='subtitle1' className={`${styles.title} ${isAuth ? '' : styles.is_not_auth}`}>
            MyUnsplash
          </Typography>
          {isAuth ? (
            <>
              <SearchBox />
              <Button className={styles.mx2} onClick={signout} variant='contained' color='inherit'>Signout</Button>
              <Button onClick={() => { setPhotoOpen(true) }} variant="contained" color='primary'>Add a photo</Button>
              <AddPhotoDialog open={photoOpen} onClose={() => { setPhotoOpen(false) }} />
            </>
          ) : (
            <>
              {/* <div id='firebaseui-auth-container'></div> */}
              <Button className={styles.mx2} onClick={() => { setAuthOpen(true) }} variant='contained' color='primary'>Signin/Signup</Button>
              <AuthDialog handleClose={() => { setAuthOpen(false) }} open={authOpen} />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
