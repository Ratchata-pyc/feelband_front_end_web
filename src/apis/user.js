import axios from "../config/axios";

const userApi = {};

userApi.uploadUserImage = (formData) => axios.patch("/users", formData);
userApi.getProfileUser = (profileUserId) => {
  return axios.get(`/users/${profileUserId}`);
};
userApi.report = (body) => axios.post("/api/reports", body);
userApi.editProfile = (body) => axios.patch("/users/update", body);

export default userApi;
