import React, { ReactNode } from "react";

import { RotateCcwIcon } from "lucide-react";

export interface NumberInputProps {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onBlur?: () => void;
  suffix?: ReactNode;
  className?: string;
  placeholder?: string;
}

const NumberInput = ({
  label,
  onChange,
  value,
  onBlur,
  placeholder,
  suffix,
}: NumberInputProps) => {
  return (
    <div className="text-tertiary space-y-2">
      <div className="flex items-center justify-between">
        <p>{label}</p>
        <RotateCcwIcon className="hover:text-primary size-4 cursor-pointer" />
      </div>
      <div className="border-elevated flex w-full items-center justify-between gap-3 rounded-md border p-3 md:p-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="text-primary h-full w-full bg-transparent leading-none focus:outline-none md:text-lg"
        />
        <div className="pr-4">{suffix}</div>
      </div>
    </div>
  );
};

export default NumberInput;
