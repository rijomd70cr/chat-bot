import React from "react";
import DataTable from "react-data-table-component";
import { generateHeader, resetHeaderOrder } from "./methods";
import "./style.css";

export default function NormalDataTable({
  data = [],
  hideColumns = [],
  changeData = [],
  headerReorder = [],
  moreColumns = [],
  onRowClicked,
}) {
  const generateHeaderSection = () => {
    if (data.length > 0)
      return resetHeaderOrder(
        [...generateHeader(data[0], hideColumns, changeData), ...moreColumns],
        headerReorder
      );
  };

  return (
    <div className="app-data-table">
      <DataTable
        data={data}
        columns={generateHeaderSection()}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}
