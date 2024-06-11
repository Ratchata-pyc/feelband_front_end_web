import axios from "../config/axios";

const userApi = {};

userApi.uploadUserImage = (formData) => axios.patch("/users", formData);
userApi.getProfileUser = (profileUserId) => {
  console.log("Calling API to get profile user with ID:", profileUserId); // Log API call
  return axios.get(`/users/${profileUserId}`);
};
userApi.report = (body) => axios.post("/api/reports", body); //แก้ไข parameter ให้รับเพียง body

export default userApi;
