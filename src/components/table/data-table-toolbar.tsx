import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterKey: string;
}

export function DataTableToolbar<TData>({
  table,
  filterKey,
}: DataTableToolbarProps<TData>) {
  const [input, setInput] = useState<string>("");

  const handleClick = () => {
    table.getColumn(filterKey)?.setFilterValue(input);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 mt-2 ml-2">
        <Input
          placeholder="Search..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          className="h-9 w-[150px] lg:w-[250px]"
        />
        <Button onClick={handleClick} size="sm" className="mt-0 h-8">
          Search
        </Button>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
