import React, { useState } from 'react'
import {
  Button
} from '@material-ui/core'
import styles from '../assets/scss/imageitem.module.scss'
import {
  DeleteConfirmDialog
} from './index'

type Props = {
  id: string
  src: string
  label: string
  caption?: string
}

const ImageItem:React.FC<Props> = React.memo(({ id, src, label }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dialogClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.root}>
      <img className={styles.item} src={src} alt={label} />
      <Button
        className={styles.deleteBtn}
        onClick={() => { setIsOpen(true) }}
        color='secondary'
        variant='outlined'
        size='small'
      >Delete</Button>
      <p className={styles.caption}>{label}</p>
      <DeleteConfirmDialog handleClose={dialogClose} open={isOpen} itemId={id} itemLabel={label} />
    </div>
  )
})

export default ImageItem
