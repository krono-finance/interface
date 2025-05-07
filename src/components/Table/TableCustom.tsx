import classNames from "classnames";

import TableHeaderCell from "./TableHeaderCell";
import { CustomTableProps } from "./types";

const CustomTable = <T extends Record<string, any>>({
  columns = [],
  data = [],
  rowKey,
  rowHeight = 60,
  headerHeight = 60,
  className,
  wrapperClassName,
  containerClassName,
  trHeaderClassName,
  theadClassName,
  tbodyClassName,
  onRowClick,
  includeThead = true,
  link,
}: CustomTableProps<T>) => {
  const getRowKey = (row: T) => {
    if (Array.isArray(rowKey)) {
      return rowKey.map((key) => row[key]).join("-");
    }
    return row[rowKey];
  };

  return (
    <div
      className={classNames(
        "border-elevated overflow-hidden rounded-xl border text-sm md:text-base",
        wrapperClassName,
      )}
    >
      <div
        className={classNames(
          "no-scroller-y relative z-0 w-full overflow-x-auto overflow-y-hidden",
          containerClassName,
        )}
      >
        <table className={className}>
          {includeThead && (
            <thead className={theadClassName}>
              <tr
                className={classNames(
                  "text-tertiary font-medium",
                  trHeaderClassName,
                )}
                style={{ height: headerHeight }}
              >
                {columns.map(
                  ({ key, label, width, headerClassName, ...rest }) => (
                    <TableHeaderCell
                      key={key}
                      label={label}
                      style={{ minWidth: width, fontWeight: 500 }}
                      {...rest}
                      className={classNames(headerClassName)}
                    />
                  ),
                )}
              </tr>
            </thead>
          )}
          <tbody className={tbodyClassName}>
            {data.length > 0 &&
              data.map((row) => (
                <tr
                  onClick={() => onRowClick && onRowClick(row)}
                  key={getRowKey(row)}
                  style={{ height: rowHeight }}
                  className="border-elevated hover:bg-elevated cursor-pointer border-b last:border-b-0"
                >
                  {columns.map(({ key, width, className, customRender }) => (
                    <td
                      key={key}
                      style={{ minWidth: width }}
                      className={classNames("px-6", className)}
                    >
                      {link ? (
                        <a href={`${link}/${row.address}`}>
                          {customRender
                            ? customRender(row[key], row)
                            : row[key]}
                        </a>
                      ) : (
                        <>
                          {customRender
                            ? customRender(row[key], row)
                            : row[key]}
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
