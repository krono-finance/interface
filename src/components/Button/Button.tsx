import React from "react";

import classNames from "classnames";

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (() => void) | ((e: any) => void);
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  id,
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={classNames(
        "m-2 inline-flex items-center justify-center rounded-3xl px-4 py-3",
        "text-sm font-semibold transition-colors",
        "focus:outline-none",
        {
          // Primary variant
          "text-background bg-accent hover:bg-accent/80":
            variant === "primary" && !disabled,

          // Secondary variant
          "border-accent/30 text-light-accent hover:bg-accent/30 border":
            variant === "secondary" && !disabled,

          // Tertiary variant
          "hover:border-accent/40 text-light-accent bg-accent/30 border border-transparent":
            variant === "tertiary" && !disabled,

          // Ghost variant
          "text-accent hover:border-accent/40 hover:bg-accent/10 border border-transparent bg-transparent":
            variant === "ghost" && !disabled,

          "bg-accent/60 text-muted cursor-not-allowed": disabled,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
