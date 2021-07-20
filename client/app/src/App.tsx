import React from 'react';
import {
  Header,
  ImageList,
  // FirebaseVarification
} from './components'
import {
  AuthProvider,
  ImagesProvider,
} from './contexts'

const App:React.FC = () => {
  return (
    <AuthProvider>
      <ImagesProvider>
      <Header />
      <ImageList>
        <p>children</p>
      </ImageList>
      {/* <FirebaseVarification /> */}
      </ImagesProvider>
    </AuthProvider>
  )
}

export default App;
