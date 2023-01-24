import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Page from "../../../Components/Page";
import Button from "../../../Components/Button";
import AppSnackBar from "../../../Components/SnackBar";
import AppTabs from "../../../Components/AppTabs";

import DoccumentList from "../Components/DoccumentList";
import DoccumentEditor from "../Components/DoccumentEditor";

import { appDateFormat } from "../../../Core/Utilities";
import { getPublishList, updatePublishData } from "../Reducer/Actions";

export default function Show() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    dispatch(getPublishList(id));
  }, [id]);

  const { data } = useSelector((state) => ({
    data: state?.publishmanagement?.data[0]?.table,
  }));
  let publishData = data?.find((x) => x._id === id);
  if (!data) return <div>Loading...</div>;

  const onClick = () => {
    console.log("hhhaaii");
  };
  const saveDoccumentForm = (fileData) => {
    let query = {
      ...fileData,
      id: id,
    };
    dispatch(updatePublishData(query));
  };
  const saveNotes = (notes) => {
    let query = {
      id: id,
      isAddNotes: true,
      notes: notes,
    };
    dispatch(updatePublishData(query));
  };
  return (
    <div>
      <Page
        title={"Doccument:- " + publishData?.title}
        goBack
        card
        girdSet={{ md: 12 }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: "60%" }}>
            <div style={{ fontSize: 12 }}>
              <table>
                <tbody>
                  <tr>
                    <th>Doccument Details</th>
                  </tr>
                  <tr>
                    <td> Created at </td>
                    <td>: {appDateFormat(publishData?.created_at)},</td>
                  </tr>
                  <tr>
                    <td> Updated at </td>
                    <td> : {appDateFormat(publishData?.updated_at)}</td>
                  </tr>
                  <tr>
                    <td> Created by </td>
                    <td> : {publishData?.created_by?.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              textAlign: "right",
              fontSize: 13,
            }}
          >
            <Button
              label="Publish"
              type="submit"
              loading={isSubmit}
              onClick={onClick}
            />
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <AppTabs
            sections={[
              {
                label: "Doccument List",
                component: (
                  <DoccumentList
                    onSumbitDoccumentForm={(data) => saveDoccumentForm(data)}
                    data={publishData?.doccuments ? publishData.doccuments : []}
                  />
                ),
              },
              {
                label: "Advanced",
                component: (
                  <DoccumentEditor
                    saveNotes={(notes) => saveNotes(notes)}
                    savedData={publishData?.notes}
                  />
                ),
              },
            ]}
          />
        </div>
        <AppSnackBar />
      </Page>
    </div>
  );
}
