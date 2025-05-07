/* eslint-disable no-unused-vars */
import { CSSProperties, ReactNode } from "react";

export type ColumnDataType = "number" | "date" | "string";

export interface SortState {
  direction: "asc" | "desc" | null;
  column: string | null;
}

interface SorterProps {
  sortState?: SortState;
  onSort?(sort: SortState): void;
}

export interface ColumnType<T extends Record<string, any>> extends SorterProps {
  key: keyof T & string;
  label: string;
  type?: ColumnDataType;
  className?: string;
  headerClassName?: string;
  width?: number | string;
  customHeader?: () => ReactNode;
  customRender?: (value: any, rowData: T) => ReactNode;
}

export interface TableHeaderCellProps extends SorterProps {
  label: string;
  className?: string;
  style?: CSSProperties;
  customHeader?: () => ReactNode;
}

export interface CustomTableProps<T extends Record<string, any>> {
  data: T[];
  rowKey: keyof T | (keyof T)[];
  columns: ColumnType<T>[];
  className?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  maxDisplayedRow?: number;
  rowHeight?: number;
  headerHeight?: number;
  trHeaderClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  onRowClick?(row: T): void;
  includeThead?: boolean;
  link?: string;
}
