import 'prismjs/themes/prism-tomorrow.css'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'

import React from 'react'
import { RecoilRoot } from 'recoil'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <RecoilRoot>{element}</RecoilRoot>
    </>
  )
}

export const onClientEntry = () => {
  const style = document.createElement('link')
  style.type = 'text/css'
  style.rel = 'stylesheet'
  style.href = 'https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap'
  document.head.appendChild(style)
}
