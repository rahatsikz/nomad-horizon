import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  variant: "solid" | "outline" | "ghost";
  disabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Button = ({
  children,
  onClick,
  type = "button",
  variant,
  disabled = false,
  ...props
}: ButtonProps) => {
  const basicStyle =
    "inline-flex w-fit items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium tracking-wide transition-[background-color,color,border-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber";

  const variantStyle = {
    solid:
      "border-amber bg-amber text-onAmber hover:bg-transparent hover:text-amberText disabled:hover:bg-amber disabled:hover:text-onAmber",
    outline:
      "border-fg/30 text-fg hover:border-amber hover:bg-amber hover:text-onAmber",
    ghost: "border-transparent text-amberText hover:bg-amber/15",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(basicStyle, variantStyle[variant], props?.className, {
        "cursor-not-allowed opacity-50": disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
