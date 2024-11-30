import { cn } from "@repo/lib";

export const Button = ({
  className,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "border-2 px-4 py-2 border-primary rounded-xl transition-colors duration-200",
        disabled
          ? "bg-gray-500 cursor-not-allowed text-white"
          : "hover:bg-primary hover:text-white",
        className,
      )}
      {...rest}
    />
  );
};
