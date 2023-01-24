import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { Divider, Grid } from "@mui/material";

import Title from "../../../Components/Title";
import CustomizedInputs from "../../../Components/TextBox";
import Button from "../../../Components/Button";

import { uploadDoccuments } from "../Reducer/Actions";

export default function DoccumentForm({
  onClose = () => {},
  onSumbitDoccumentForm = () => {},
}) {
  const [form, setForm] = useState({
    doccumenttitle: "",
    description: "",
    file: "",
  });
  const [extension, setExtension] = useState("");
  const inputref = useRef(null);
  const dispatch = useDispatch();

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
  const fileUpload = (e) => {
    const { files } = e.target;
    dispatch(uploadDoccuments(files[0])).then((res) => {
      setForm({
        ...form,
        file: res.result.filename,
      });
      setExtension(res.result.extension);
    });
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
          <Grid item lg={12} md={12} xs={12} sx={{ mt: 2, display: "flex" }}>
            <input
              ref={inputref}
              type="file"
              style={{ display: "none" }}
              onChange={fileUpload}
            ></input>
            <Button
              label="File Upload"
              type="submit"
              loading={false}
              onClick={() => inputref.current.click()}
            />
            {form.file && (
              <div>
                {extension === "image" && (
                  <img
                    src={
                      form.file
                        ? "http://localhost:8000/publish?files=" + form.file
                        : "https://via.placeholder.com/468x60?text=file"
                    }
                    alt="sample"
                  ></img>
                )}
                {extension !== "image" && (
                  <p
                    style={{ margin: "auto", cursor: "pointer", color: "#ccc" }}
                    onClick={() => {
                      window.open(
                        "http://localhost:8000/publish?files=" + form.file,
                        "_blank",
                        "noreferrer"
                      );
                    }}
                  >
                    {" "}
                    {form.file}
                  </p>
                )}
              </div>
            )}
          </Grid>
          <Grid item lg={12} md={12} xs={12} sx={{ mt: 2 }}>
            <CustomizedInputs
              placeholder="Description"
              onChange={(e) => onChange(e, "description")}
              value={form.description}
              multiline={true}
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
