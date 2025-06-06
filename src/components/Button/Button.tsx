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
        "inline-flex items-center justify-center rounded-3xl px-4 py-2",
        "text-sm font-semibold transition-colors",
        "focus:outline-none",
        {
          // Primary variant
          "bg-accent hover:bg-accent/80 border border-transparent":
            variant === "primary" && !disabled,

          // Secondary variant
          "border-elevated hover:bg-surface-hover bg-elevated border":
            variant === "secondary" && !disabled,

          // Tertiary variant
          "border-border hover:bg-surface-hover border":
            variant === "tertiary" && !disabled,

          // Ghost variant
          "hover:border-elevated hover:bg-elevated border border-transparent bg-transparent":
            variant === "ghost" && !disabled,

          "bg-accent/60 text-muted cursor-not-allowed border border-transparent":
            disabled,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
