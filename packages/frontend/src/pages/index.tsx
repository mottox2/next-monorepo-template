import Head from 'next/head'
import { useEffect, useState } from 'react'
import firebase from '../libs/firebase'

export default function Home() {
  const [currentUser, setCurrentUser] = useState<firebase.User>()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((state) => {
      if (!state) return setCurrentUser(null)
      setCurrentUser(state)
    })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {JSON.stringify(currentUser)}
        <div>
          <button onClick={async () => {
            const provider = new firebase.auth.GoogleAuthProvider()
            const result = await firebase.auth().signInWithPopup(provider)
            console.log(result)
          }}>
            signInWithGoogle
          </button>
          <button onClick={async () => {
            firebase.auth().signOut()
          }}>
            signOut
          </button>
        </div>
      </main>
    </div>
  )
}
