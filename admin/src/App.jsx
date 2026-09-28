import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import React from 'react'

const App = () => {
  return (
    <div>
     HOme page App

       <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  )
}

export default App
