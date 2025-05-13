import React, { ReactNode } from "react";

import classNames from "classnames";

export interface NumberInputProps {
  label?: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onBlur?: () => void;
  suffix?: ReactNode;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
}

const NumberInput = ({
  label,
  onChange,
  value,
  onBlur,
  placeholder,
  suffix,
  inputClassName,
  className,
}: NumberInputProps) => {
  return (
    <div className="text-tertiary space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <p>{label}</p>
          {/* <RotateCcwIcon className="hover:text-primary size-4 cursor-pointer" /> */}
        </div>
      )}

      <div
        className={classNames(
          "border-elevated flex w-full items-center justify-between gap-3 rounded-md border p-3 md:p-4",
          className,
        )}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={classNames(
            "text-primary h-full w-full bg-transparent leading-none focus:outline-none md:text-lg",
            inputClassName,
          )}
        />
        <div className="grid w-full justify-end">{suffix}</div>
      </div>
    </div>
  );
};

export default NumberInput;
