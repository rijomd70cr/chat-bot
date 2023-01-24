import React, { useState } from "react";

import NormalDataTable from "../../../Components/AppDataTable/NormalDataTable";
import Button from "../../../Components/Button";
import AppModalPopUp from "../../../Components/AppModalPopUp";
import DoccumentForm from "./DoccumentForm";

import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";

export default function DoccumentList({
  data = [],
  onSumbitDoccumentForm = () => {},
}) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState();

  const onOpenModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const deleteItem = () => {
    let item = { ...deleteData };
    item.delete = true;
    setOpenDeleteModal(false);
    onSumbitDoccumentForm(item);
  };
  const onRowClicked = (data) => {
    console.log(data, "onRowClicked");
  };
  return (
    <div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            textAlign: "right",
            fontSize: 13,
          }}
        >
          <Button
            label="Upload"
            type="submit"
            loading={false}
            onClick={onOpenModal}
          />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <NormalDataTable
          data={data}
          onRowClicked={(data) => onRowClicked(data)}
          hideColumns={["description", "file"]}
          moreColumns={[
            {
              name: "Actions",
              cell: (row) => {
                return (
                  <DeleteIcon
                    onClick={() => {
                      console.log(row, "row");
                      setOpenDeleteModal(true);
                      setDeleteData(row);
                    }}
                  />
                );
              },
            },
          ]}
        />
      </div>
      <AppModalPopUp open={isOpenModal || isOpenDeleteModal}>
        {isOpenModal && (
          <DoccumentForm
            onClose={closeModal}
            onSumbitDoccumentForm={(form) => {
              onSumbitDoccumentForm(form);
              closeModal();
            }}
          />
        )}
        {isOpenDeleteModal && (
          <div>
            <div style={{ display: "flex" }}>
              <p style={{ flex: 3, margin: 0 }}>Are you sure to delete this?</p>
              <p
                style={{
                  textAlign: "right",
                  flex: 1,
                  cursor: "pointer",
                  margin: 0,
                }}
                onClick={() => {
                  setOpenDeleteModal(false);
                }}
              >
                X
              </p>
            </div>
            <Divider />
            <Button
              label="Yes"
              type="submit"
              loading={false}
              onClick={deleteItem}
            />
          </div>
        )}
      </AppModalPopUp>
    </div>
  );
}
