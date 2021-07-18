import React, { useContext } from 'react'
import {
  Button
} from '@material-ui/core'
import styles from '../assets/scss/imageitem.module.scss'
import {
  AuthContext
} from '../contexts'
import { db } from '../assets/ts/firebase'

type Props = {
  id: string
  src: string
  label: string
  caption?: string
}

const ImageItem:React.FC<Props> = ({ id, src, label }) => {
  const { currentUser } = useContext(AuthContext)

  const imgDelete = () => {
    console.log('delete', id)
    db.ref(`users/${currentUser?.uid}/${id}`).remove()
  }

  return (
    <div className={styles.root}>
      <img className={styles.item} src={src} alt={label} />
      <Button
        className={styles.deleteBtn}
        onClick={imgDelete}
        color='secondary'
        variant='outlined'
        size='small'
      >Delete</Button>
      <p className={styles.caption}>{label}</p>
    </div>
  )
}

export default ImageItem
