import React, { useState } from "react";
import NormalDataTable from "../../../Components/AppDataTable/NormalDataTable";
import Button from "../../../Components/Button";
import AppModalPopUp from "../../../Components/AppModalPopUp";
import DoccumentForm from "./DoccumentForm";

export default function DoccumentList({
  data = [],
  onSumbitDoccumentForm = () => {},
}) {
  const [isOpenModal, setOpenModal] = useState(false);
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
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
          changeData={[
            {
              name: "label",
              selector: (row) => row.label,
            },
            {
              name: "key",
              selector: (row) => row.key,
            },
            {
              name: "description",
              selector: (row) => row.description,
            },
          ]}
        />
      </div>
      <AppModalPopUp open={isOpenModal}>
        {isOpenModal && (
          <DoccumentForm
            onClose={closeModal}
            onSumbitDoccumentForm={(form)=>{onSumbitDoccumentForm(form);closeModal()}}
          />
        )}
      </AppModalPopUp>
    </div>
  );
}
