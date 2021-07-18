import React, { useState } from 'react'
import {
  TextField,
  InputAdornment
} from '@material-ui/core'
import {
  SearchOutlined
} from '@material-ui/icons'
import styles from '../assets/scss/searchbox.module.scss'
import {
  useImages,
} from '../contexts'

type Props = {}

const SearchBox: React.FC<Props> = () => {

  const [text, setText] = useState<string>('')
  const { getFirebaseImages, searchFirebaseImages } = useImages()

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case 'Enter':
        searchFirebaseImages(text)
        break
      case 'Backspace':
        if (text === '')
          getFirebaseImages()
        break
      default:
        break
    }

  }

  return (
    <div className={styles.root}>
      <TextField
        placeholder='Search'
        size='small'
        variant='outlined'
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)}
        onKeyUp={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlined />
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default SearchBox
