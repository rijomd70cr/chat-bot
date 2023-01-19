import React from "react";
import AppDataTable from "../../../Components/AppDataTable";
import useRedirect from "../../../Core/Hooks/Redirect";

export default function List() {
  const { redirectTo } = useRedirect();

  return (
    <AppDataTable
      title="Publish Management"
      module="publish"
      apiUrl="http://localhost:8000/publish/publishList"
      hideColumns={["_id"]}
      onRowClicked={(event) => {
        redirectTo("/publish/" + event._id);
      }}
      headerReorder={[
        "title",
        "register_no",
        "is_release",
        "created_at",
        "updated_at",
        "is_publish",
      ]}
      changeData={[
        {
          name: "is_release",
          keyName: "is_release",
          cell: (row) => {
            return <p>{row.is_release ? "Released" : "No Relased"}</p>;
          },
        },
        {
          name: "is_publish",
          keyName: "is_publish",
          cell: (row) => {
            return <p>{row.is_publish ? "Published" : "Not Published"}</p>;
          },
        },
      ]}
    ></AppDataTable>
  );
}
