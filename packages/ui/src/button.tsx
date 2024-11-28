import { cn } from '@repo/lib'

export const Button = ({
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn('border-2 px-4 py-2 border-primary rounded-xl', className)}
      {...rest}
    />
  )
}
