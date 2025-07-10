import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "text-white z-[1] !py-2 !px-4 !font-normal text-[14px] leading-[150%] tracking-[-0.32px] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-orange-600 text-primary-foreground shadow hover:bg-orange-600/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-orange-400 text-information-foreground shadow hover:bg-orange-400/80",
        ghost:
          "text-black bg-gray-100 hover:bg-gray-200 hover:text-accent-foreground",
        custom:
          "!px-4 !py-1.5 main-color bg-white border border-gray-200  font-normal text-[14px] hover:bg-gray-200 ",
        link: "text-primary underline-offset-4 hover:underline",
        blacked:
          "bg-black text-white  hover:bg-black/90 rounded-xl !px-4 !py-4",
        antiBlacked:
          "bg-gray-100 text-black  hover:bg-gray-200 rounded-xl !px-4 !py-4",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
