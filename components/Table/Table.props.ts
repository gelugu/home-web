import { Key, ReactChild } from "react";

export interface TableProps {
  name: string;
  columns: IColumn[];
  rows: IRow[];
}

export interface IColumn {
  value: string;
  key: Key;
  size: number;
}

export interface IRow {
  values: ReactChild[];
  key: Key;
  onClick?: () => void;
}
