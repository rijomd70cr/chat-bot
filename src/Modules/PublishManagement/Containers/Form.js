import React, { useState } from "react";
import Page from "../../../Components/Page";
import FormBuilder from "../../../Components/FormBuilder";
import { useDispatch } from "react-redux";
import { savePublishData } from "../Reducer/Actions";
import useRedirect from "../../../Core/Hooks/Redirect";

export default function Form() {
  const [formElements] = useState([
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Title Name",
      autoFocus: true,
      column: 6,
    },
    {
      label: "Register Number",
      name: "register_no",
      type: "text",
      placeholder: "Register Number",
      autoFocus: true,
      column: 6,
    },
  ]);

  const dispatch = useDispatch();
  const { redirectTo } = useRedirect();

  const handSubmit = (event, data, errorCallBack) => {
    dispatch(savePublishData(data))
      .then((res) => {
        errorCallBack({});
        redirectTo("/publish-list/");
      })
      .catch((error) => {
        errorCallBack(error.errors);
      });
  };

  return (
    <Page title="New Publish Statement" goBack card girdSet={{ md: 6 }}>
      <FormBuilder formElements={formElements} onSubmit={handSubmit} />
    </Page>
  );
}
