import React, { useState, useRef, useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core'
import { db } from '../assets/ts/firebase'
import {
  AuthContext,
} from '../contexts'

type Props = {
  open: boolean
  onClose: () => void
}

type SendData = {
  label: string
  url: string
}

const AddPhotoDialog: React.FC<Props> = ({ open, onClose }) => {
  const { currentUser } = useContext(AuthContext)
  const labelRef = useRef()
  const [label, setLabel] = useState<string>('')
  // const [isLabelError, setIsLabelError] = useState(false)
  const urlRef = useRef()
  const [url, setUrl] = useState<string>('')
  // const [isUrlError, setIsUrlError] = useState(false)
  const [disabled, setDisabled] = useState(false)

  // const handleChange = () => {
  //   // TODO : バリデーション
  // }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (arg: SendData) => {
    console.log('送信データ:', arg)
    if (currentUser)
      db.ref('users/' + currentUser.uid).push({...arg})
    else
      console.log('認証済みユーザーではないので、登録不可')
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open} aria-labelledby='dialog-title' fullWidth={true}>
      <DialogTitle id='dialog-title'>Add a new photo</DialogTitle>
      <DialogContent>
        <TextField
          // error={isLabelError}
          required
          fullWidth
          inputRef={labelRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
          label='Label'
          placeholder='Suspendisse elit massa'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          // error={isUrlError}
          required
          fullWidth
          inputRef={urlRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          label='Photo URL'
          placeholder='https://xxx.com/photo-xxxxxxxxxxxxx'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit.bind(this, { label, url })} color='primary' variant='contained' disabled={disabled}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddPhotoDialog
