import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import firebase, { auth } from '../assets/ts/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

type Props = {
  open: boolean
  handleClose: () => void
}

const AuthDialog: React.FC<Props> = ({ handleClose, open }) => {
  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>SignIn / SignUp</DialogTitle>
      <DialogContent>
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            signInSuccessUrl: '',
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
              // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            ],
          }}
          firebaseAuth={auth}
        />
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
