import React from 'react'
import { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <p> Header </p>
      <Component {...pageProps} />
      <p> Footer</p>
    </div>
  )
}


export default MyApp
