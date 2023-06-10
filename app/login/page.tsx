'use client'

import { Button } from '@/components/ui/button'

import { createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

export default function Login() {
  const connect = async () => {
    if (!window?.ethereum) return

    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum)
    })

    const accounts = await walletClient.requestAddresses()
    const signature = await walletClient.signMessage({
      message: 'hello',
      account: accounts[0]
    })

    console.log(signature)
  }

  const signup = async () => {
    await fetch('/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'user-' + Date.now(),
        password: 'password-' + Date.now()
      })
    })
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Button variant="outline" size="lg" onClick={() => connect()}>
        Connect with Metamask
      </Button>
      <Button variant="outline" size="lg" onClick={() => signup()}>
        Sign up
      </Button>
    </div>
  )
}
