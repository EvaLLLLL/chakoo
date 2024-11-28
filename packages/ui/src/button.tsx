import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button onClick={() => alert(`Hello from your monorepo app!`)}>
      {children}
    </button>
  )
}
