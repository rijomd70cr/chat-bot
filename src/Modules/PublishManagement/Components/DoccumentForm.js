import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Grid } from "@mui/material";

import Title from "../../../Components/Title";
import CustomizedInputs from "../../../Components/TextBox";
import Button from "../../../Components/Button";

export default function DoccumentForm({
  onClose = () => {},
  onSumbitDoccumentForm = () => {},
}) {
  const [form, setForm] = useState({
    doccumenttitle: "",
    description: "",
    file: "",
  });
  const onChange = (e, data) => {
    if (data === "title") {
      setForm({
        ...form,
        doccumenttitle: e.target.value,
      });
    } else {
      setForm({
        ...form,
        description: e.target.value,
      });
    }
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2, margin: 0 }}>
          <Title title="Add Doccuments" />
        </div>
        <div
          style={{ flex: 1, textAlign: "end", cursor: "pointer", margin: 0 }}
          onClick={onClose}
        >
          <CloseIcon />
        </div>
      </div>
      <Divider />
      <div style={{ mt: 2 }}>
        <Grid container>
          <Grid item lg={12} md={12} xs={12} sx={{ mt: 2 }}>
            <CustomizedInputs
              placeholder="Doccument Title"
              onChange={(e) => onChange(e, "title")}
              value={form.doccumenttitle}
            />
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mt: 2 }}>
            <CustomizedInputs
              placeholder="Description"
              onChange={(e) => onChange(e, "description")}
              value={form.description}
            />
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mt: 2 }}>
            <Button
              label="Submit"
              type="submit"
              loading={false}
              onClick={() => onSumbitDoccumentForm(form)}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
