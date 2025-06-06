import classNames from "classnames";

import { TableHeaderCellProps } from "./types";

const TableHeaderCell = ({
  className,
  label,
  sortState,
  onSort,
  style,
  customHeader,
}: TableHeaderCellProps) => {
  return (
    <th scope="col" style={style} className={classNames("px-6", className)}>
      {customHeader ? (
        customHeader()
      ) : (
        <>
          <span>{label}</span>
          {onSort && sortState && (
            <button
              onClick={() => {
                onSort({
                  direction: sortState.direction === "asc" ? "desc" : "asc",
                  column: label,
                });
              }}
            >
              {sortState.direction === "asc" ? "↑" : "↓"}
            </button>
          )}
        </>
      )}
    </th>
  );
};

export default TableHeaderCell;
