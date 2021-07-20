import React, { useState, useContext } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core'
import {
  AuthContext
} from '../contexts'
import { db } from '../assets/ts/firebase'

type Props = {
  itemId: string
  itemLabel: string
  open: boolean
  handleClose: () => void
}

const DeleteConfirmDialog: React.FC<Props> = ({ handleClose, open, itemId, itemLabel }) => {
  const { currentUser } = useContext(AuthContext)
  const [disabled, setDisabled] = useState<boolean>(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (itemLabel === e.target.value) setDisabled(false)
    else setDisabled(true)
  }

  const deleteImage = () => {
    db.ref(`users/${currentUser?.uid}/${itemId}`).remove()
    handleClose()
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <p>Please type <b>{itemLabel}</b> to confirm.</p>
        <TextField
          fullWidth
          type='text'
          label='Confirm label'
          placeholder={itemLabel}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteImage} color='secondary' variant='contained' disabled={disabled}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmDialog
