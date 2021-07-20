import React, { useContext } from 'react'
import {
  Container,
  Grid
} from '@material-ui/core'
import Masonry from 'react-masonry-css'
import styles from '../assets/scss/imagelist.module.scss'
import {
  ImageItem
} from './index'
import {
  AuthContext,
  ImagesContext,
} from '../contexts'
// import bg from '../assets/img/logo_transparent.png'

type Props = {}

const breakpointColumsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1
}

// const mainBg = {
//   margin: '0 auto',
//   width: '100vh',
//   height: '75vh',
//   backgroundImage: `url(${bg})`,
//   backgroundPosition: 'center',
//   backgroundSize: 'cover',
//   opacity: '0.5'
// }

const ImageList:React.FC<Props> = () => {
  const { isAuth } = useContext(AuthContext)
  const { state } = useContext(ImagesContext)

  return (
    <Container>
      <Grid container>
          {isAuth ? (
            state.images ? (
              <Grid item xs={12}>
                <Masonry
                  breakpointCols={breakpointColumsObj}
                  className={styles['my-masonry-grid']}
                  columnClassName={styles['my-masonry-grid_column']}
                >
                  {Object.keys(state.images).map((val, idx) => (
                    state.images && (
                      <div key={idx}>
                        <ImageItem id={val} src={state.images[val].url} label={state.images[val].label} />
                      </div>
                    )
                  ))}
                </Masonry>
              </Grid>
            ) : (
              <div className={styles.main}>
                <Grid item xs={12}>
                  <h3>No search images ...</h3>
                </Grid>
                <Grid item xs={12}>
                  <div className={styles.bg_img}></div>
                  {/* <div style={mainBg}></div> */}
                </Grid>
            </div>
            )
          ) : (
            <div className={styles.main}>
              <Grid item xs={12}>
                <h3>Welcome my unsplash</h3>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.bg_img}></div>
                {/* <div style={mainBg}></div> */}
              </Grid>
            </div>
          )}
      </Grid>
    </Container>
  )
}


export default ImageList
