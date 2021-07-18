import React from 'react'
import { db, auth } from '../assets/ts/firebase'

import {
  useImages,
} from '../contexts/images'

const Component: React.FC = () => {

  const { searchFirebaseImages } = useImages()

  const getData = async () => {
    const ref = db.ref('users/jeU27l6FWrRcojEfbracIvESXk13')
    const snapshots = await ref.get()
    const data = snapshots.val()
    console.log(data)
  }

  const setData = () => {
    db.ref('test/').set({
      hoge: 'hoge',
      fuga: 'fuga',
      foo: {
        bar: 'bar',
        baz: 'baz'
      }
    })
  }

  const setData2 = () => {
    db.ref('test/').set({
      piyo: 'piyo'
    })
  }

  const createUser = () => {
    auth.createUserWithEmailAndPassword('yoshihiko05410@gmail.com', 'Admin12345')
    .then(res => {
      console.log('user:', res.user)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const signin = () => {
    auth.signInWithEmailAndPassword('yoshihiko05410@gmail.com', 'Admin12345')
    .then(res => {
      console.log('success', res.user)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const signout = () => {
    auth.signOut()
    .then(res => {
      console.log('sign out!!', res)
    })
    .catch(e => {
      console.log(e)
    })
  }

  const isAuth = () => {
    auth.onAuthStateChanged(user => {
      console.log('checkUser:', user)
      if (user) {
        console.log('signin complate')
      } else {
        console.log('not signin!!!')
      }
    })
  }

  const search = () => {
    searchFirebaseImages('hoge')
    // const ref = db.ref('users/jeU27l6FWrRcojEfbracIvESXk13')
    // ref.orderByChild('label').equalTo('Bag').once('value', snap => {
    // // ref.orderByChild('label').startAt('Bag').endAt('Bag').once('value', snap => {
    // // 前方一致風な書き方
    // // ref.orderByChild('label').startAt('Bag').endAt('Bag' + '\uf8ff').once('value', snap => {
    //   console.log('value:', snap.val())
    // })
  }

  return (
    <>
      <button onClick={getData}>getData</button>
      <button onClick={setData}>setData</button>
      <button onClick={setData2}>setData2</button>
      <button onClick={createUser}>createUser</button>
      <button onClick={signin}>signin</button>
      <button onClick={signout}>signout</button>
      <button onClick={isAuth}>isAuth</button>
      <button onClick={search}>search</button>
    </>
  )
}

export default Component
