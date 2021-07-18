/** 画像の型定義 */
export type Image = {
  label: string
  url: string
}

/** Firebaseから受け取る画像の型定義 */
export type ImageResponse = {
  [id: string]: Image
}
