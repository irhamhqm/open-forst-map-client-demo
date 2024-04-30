import axios from "axios";
import {
  BioDiversityIndexPayload,
  BioDiversityIndexResponse,
  ContinuousMonitoringPayload,
  ContinuousMonitoringResponse,
  EcologicalResilienceDetailsResponse,
  EcologicalResiliencePayload,
  EcologicalResilienceResponse,
  FireEventDetailsResponse,
  PolicyDetailsResponse,
  ProgramDetailsReponse,
} from "../types/api";

const API_URL = import.meta.env.VITE_API_URL;

export const getBiodiversityIndex: (
  payload: BioDiversityIndexPayload
) => Promise<BioDiversityIndexResponse> = async (payload) => {
  const response = await axios.post(
    `${API_URL}/api/biodiversity_index`,
    payload
  );

  return response.data;
};

export const getContinuousMonitoring: (
  payload: ContinuousMonitoringPayload
) => Promise<ContinuousMonitoringResponse> = async (payload) => {
  const response = await axios.post(
    `${API_URL}/api/continuous_monitoring`,
    payload
  );

  return response.data;
};

export const getEcologicalResilience: (
  payload: EcologicalResiliencePayload
) => Promise<EcologicalResilienceResponse> = async (payload) => {
  const response = await axios.post(
    `${API_URL}/api/ecological_resilience`,
    payload
  );

  return response.data;
};

export const getEcologicalResilienceDetails: (payload: {
  id: string;
}) => Promise<EcologicalResilienceDetailsResponse> = async (payload) => {
  const response = await axios.get(
    `${API_URL}/api/ecological_resilience/${payload.id}`
  );

  return response.data;
};

export const getPolicyDetails: (payload: {
  id: string;
}) => Promise<PolicyDetailsResponse> = async (payload) => {
  const response = await axios.get(`${API_URL}/api/policy/${payload.id}`);

  return response.data;
};

export const getProgramDetails: (payload: {
  id: string;
}) => Promise<ProgramDetailsReponse> = async (payload) => {
  const response = await axios.get(`${API_URL}/api/program/${payload.id}`);

  return response.data;
};

export const getFireEventDetails: (payload: {
  id: string;
}) => Promise<FireEventDetailsResponse> = async (payload) => {
  const response = await axios.get(`${API_URL}/api/fire_event/${payload.id}`);

  return response.data;
};

export const getFile: (payload: { id: string }) => Promise<object> = async (
  payload
) => {
  const response = await axios.get(`${API_URL}/api/files/${payload.id}`);

  return response.data;
};
