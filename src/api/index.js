import axiosAuthInstance from "../util/axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getBiodiversityIndex = async (payload) => {
  const response = await axiosAuthInstance().post(
    `${API_URL}/api/client/biodiversity_index`,
    payload
  );

  return response.data;
};

export const getContinuousMonitoring = async (payload) => {
  const response = await axiosAuthInstance().post(
    `${API_URL}/api/client/continuous_monitoring`,
    payload
  );

  return response.data;
};

export const getEcologicalResilience = async (payload) => {
  const response = await axiosAuthInstance().post(
    `${API_URL}/api/client/continuous_monitoring`,
    payload // must only have ndvi
  );

  return response.data;
};

export const getEcologicalResilienceDetails = async (payload) => {
  const response = await axiosAuthInstance().post(
    `${API_URL}/api/client/ecological_resilience/`,
    payload
  );

  return response.data;
};

export const getPolicyDetails = async (payload) => {
  const response = await axiosAuthInstance().get(
    `${API_URL}/api/policy/${payload.id}`
  );

  return response.data;
};

export const getProgramDetails = async (payload) => {
  const response = await axiosAuthInstance().get(
    `${API_URL}/api/program/${payload.id}`
  );

  return response.data;
};

export const getFireEventDetails = async (payload) => {
  const response = await axiosAuthInstance().get(
    `${API_URL}/api/fire_event/${payload.id}`
  );

  return response.data;
};

export const getFile = async (payload) => {
  const response = await axiosAuthInstance().get(
    `${API_URL}/api/files/${payload.id}`
  );

  return response.data;
};
