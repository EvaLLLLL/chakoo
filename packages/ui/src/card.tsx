import { cn } from '@repo/lib'

export const Card: React.FC<{
  title: string
  className?: string
  children: React.ReactNode
}> = ({ title, className, children }) => {
  return (
    <div
      className={cn(
        'shadow-xl border rounded-xl border-primary flex flex-col overflow-hidden',
        className
      )}>
      <div className="border p-4 border-b text-xl font-semibold">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  )
}
