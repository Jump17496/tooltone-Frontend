import axios from "axios";

export const createLocation = async (data) =>
  await axios.post(process.env.REACT_APP_API + "/location", data);

export const listProvince = async () =>
  await axios.get(process.env.REACT_APP_API + "/province");

export const listAumphre = async (provinceId) =>
  await axios.get(
    `${process.env.REACT_APP_API}/province/${provinceId}/amphure`
  );

export const listDistrict = async (amphureId) =>
  await axios.get(`${process.env.REACT_APP_API}/amphure/${amphureId}`);
