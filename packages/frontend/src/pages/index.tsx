import Head from 'next/head'
import { useEffect, useState } from 'react'
import firebase from '../libs/firebase'

export default function Home() {
  const [currentUser, setCurrentUser] = useState<firebase.User>()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (state) => {
      if (!state) return setCurrentUser(null)
      setCurrentUser(state)
      const idToken = await state.getIdToken()
      console.log(idToken, state)
    })
  }, [])

  const verify = async () => {
    if (!currentUser) return
    const idToken = await currentUser.getIdToken(true)
    console.log(idToken)
    fetch(`/api/auth?token=${idToken}`)
  }

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
          <button onClick={verify}>Verify</button>
        </div>
      </main>
    </div>
  )
}
