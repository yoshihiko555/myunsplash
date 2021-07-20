import React, { createContext, useEffect, useContext, useReducer, useCallback } from "react";
import { ImageResponse } from '../assets/ts/types'
import { AuthContext } from './index'
import { db } from '../assets/ts/firebase'

// **********************************
// State関連の処理
// **********************************

/** Image管理ステートの型定義 */
type ImageState = {
  images: ImageResponse | undefined
}

/** Image管理ステートの初期値を定義 */
const initialState: ImageState = {
  images: undefined
}

// **********************************
// Reducer関連の処理
// **********************************

/** Images操作用のアクションタイプの型定義 */
type ImageActionType = {
  type: string
  payload?: ImageResponse
}

/** 各ActionTypeの定義 */
export const ACTION_TYPES = {
  GET_IMAGES: 'GET_IMAGES_ACTION',
  SET_IMAGES: 'SET_IMAGES_ACTION',
  INIT_IMAGES: 'INIT_IMAGES_ACTION',
} as const

/** Images取得用のアクションクリエイター */
export const getImagesAction = (): ImageActionType => ({ type: ACTION_TYPES.GET_IMAGES })

/** Images設定用のアクションクリエイター */
export const setImagesAction = (
  payload: ImageResponse
): ImageActionType => ({
  type: ACTION_TYPES.SET_IMAGES,
  payload
})

/** Images初期化用のアクションクリエイター */
export const initImagesAction = (): ImageActionType => ({ type: ACTION_TYPES.INIT_IMAGES})

/** Reducerの定義 */
const reducer = (state: ImageState, action: ImageActionType) => {
  switch (action.type) {
    case ACTION_TYPES.GET_IMAGES:
      return state
    case ACTION_TYPES.SET_IMAGES:
      return { ...state, images: action.payload }
    case ACTION_TYPES.INIT_IMAGES:
      return initialState
    default:
      return state
  }
}

// **********************************
// Context関連の処理
// **********************************

/** ImagesContext用の型定義 */
type TImagesContext = {
  state: ImageState
  dispatch: React.Dispatch<ImageActionType>
}

/** ImagesContextの実体 */
export const ImagesContext = createContext<TImagesContext>({} as TImagesContext)

// **********************************
// ImagesContextのラッパー
// **********************************
export const ImagesProvider: React.FC = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (currentUser) {
      console.log('認証済みユーザーが存在する')
      const ref = db.ref(`users/${currentUser.uid}`)
      ref.on('value', snapshot => {
        console.log('snapshot:', snapshot)
        console.log('実データ:', snapshot.val())
        dispatch(setImagesAction(snapshot.val()))
      })
    } else {
      console.log('認証済みユーザーが存在しない')
      dispatch(initImagesAction())
    }
  }, [currentUser])

  return (
    <ImagesContext.Provider value={{ state, dispatch }}>
      {children}
    </ImagesContext.Provider>
  )
}

// **********************************
// カスタムフックの作成
// **********************************
export const useImages = () => {
  const { currentUser } = useContext(AuthContext)
  const { state, dispatch } = useContext(ImagesContext)

  /**
   * Firebaseからデータを取得して、ストアにセットする
   */
  const getFirebaseImages = useCallback(() => {
    if (currentUser) {
      const ref = db.ref(`users/${currentUser.uid}`)
      ref.once('value', snapshot => {
        dispatch(setImagesAction(snapshot.val()))
      })
    } else {
      console.log('認証済みユーザーが存在しない')
    }
  }, [currentUser, dispatch])

  /**
   * 引数で受け取った文字列をもとにFirebaseのQuery機能を使用して、データを取得しに行く
   */
  const searchFirebaseImages = useCallback(text => {
    if (currentUser) {
      const ref = db.ref(`users/${currentUser.uid}`)
      // ref.orderByChild('label').equalTo('Bag').once('value', snap => {
      // ref.orderByChild('label').startAt('Bag').endAt('Bag').once('value', snap => {
      // 前方一致風な書き方
      ref.orderByChild('label').startAt(text).endAt(text + '\uf8ff').once('value', snap => {
        console.log('value:', snap.val())
        dispatch(setImagesAction(snap.val()))
      })
    } else {
      console.log('認証ユーザーが存在しない')
    }
  }, [currentUser, dispatch])

  return {
    state,
    getFirebaseImages,
    searchFirebaseImages,
  }
}
