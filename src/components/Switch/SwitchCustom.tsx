import React from "react";

import { Switch } from "@headlessui/react";
import classNames from "classnames";

interface SwitchCustomProps {
  checked: boolean;
  onChange: () => void;
}

const SwitchCustom = ({ checked, onChange }: SwitchCustomProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={classNames(
        "group bg-elevated relative flex w-14 cursor-pointer rounded-full",
        "p-1 ease-in-out focus:not-data-focus:outline-none",
        "data-checked:bg-accent data-focus:outline data-focus:outline-white",
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          "pointer-events-none inline-block size-5 translate-x-0 rounded-full",
          "bg-primary shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7",
        )}
      />
    </Switch>
  );
};

export default SwitchCustom;
