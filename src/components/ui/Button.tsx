import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  variant: "solid" | "outline" | "ghost";
} & React.HTMLAttributes<HTMLDivElement>;

export const Button = ({
  children,
  onClick,
  type = "button",
  variant,
  ...props
}: ButtonProps) => {
  const basicStyle =
    "w-fit text-base tracking-wider rounded px-5 py-1.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral focus-visible:ring-offset-2";

  const variantStyle = {
    solid:
      "bg-primary text-white border-2 border-transparent hover:bg-transparent hover:text-primary hover:border-primary",
    outline:
      "border-2 border-primary text-primary hover:text-white hover:bg-primary hover:border-transparent",
    ghost: "text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(basicStyle, variantStyle[variant], props?.className)}
    >
      {children}
    </button>
  );
};
