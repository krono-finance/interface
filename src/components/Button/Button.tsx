import React from "react";

import classNames from "classnames";

export interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (() => void) | ((e: any) => void);
  variant?: "primary" | "secondary";
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
        "inline-flex items-center justify-center rounded-lg px-4 py-3",
        "text-sm font-medium transition-colors xl:text-base",
        "focus:outline-none",
        {
          // Primary variant
          "bg-accent hover:bg-accent/80": variant === "primary" && !disabled,

          // Secondary variant
          "hover:bg-accent/30 border-accent/30 text-accent border":
            variant === "secondary" && !disabled,

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
