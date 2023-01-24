import { setPublishData } from ".";
import { request } from "../../../Core/Services/Request";

export const savePublishData = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return request(
      "http://192.168.1.78:8000/publish/creatpublish",
      data,
      "POST"
    )
      .then((res) => {
        dispatch(setPublishData({ data: res.result }));
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getPublishList = (data) => (dispatch) => {
  return request(
    "http://192.168.1.78:8000/publish/publishList?limit=19&page=1",
    "",
    "GET"
  ).then((res) => {
    dispatch(setPublishData({ data: res.result }));
  });
};

export const updatePublishData = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    return request(
      "http://192.168.1.78:8000/publish/updatepublish",
      data,
      "POST"
    )
      .then((res) => {
        dispatch(setPublishData({ data: res.result }));
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadDoccuments = (data) => (dispatch) => {
  let formData = new FormData();
  formData.append("file", data);
  return new Promise((resolve, reject) => {
    return request(
      "http://192.168.1.78:8000/publish/upload",
      formData,
      "POST",
      true
    )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
