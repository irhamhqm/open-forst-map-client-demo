import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBiodiversityIndex,
  getContinuousMonitoring,
  getEcologicalResilience,
  getEcologicalResilienceDetails,
  getFireEventDetails,
  getPolicyDetails,
  getProgramDetails,
} from "../api";

export const useGetBiodiversityIndex = () => {
  return useMutation({
    mutationKey: ["biodiversity_index"],
    mutationFn: (payload) => getBiodiversityIndex(payload),
  });
};

export const useGetContinuousMonitoring = () => {
  return useMutation({
    mutationKey: ["continuous_monitoring"],
    mutationFn: (payload) => getContinuousMonitoring(payload),
  });
};

export const useGetEcologicalResilience = () => {
  return useMutation({
    mutationKey: ["ecological_resilience"],
    mutationFn: (payload) => getEcologicalResilience(payload),
  });
};

export const useGetEcologicalResilienceDetails = (payload) => {
  const { id } = payload;
  return useQuery({
    queryKey: ["ecological_resilience_details", id],
    queryFn: () => getEcologicalResilienceDetails({ id }),
    enabled: !!id,
    // select: ({ data }) => data,
  });
};

export const useGetFireEventDetails = ({ id, type }) => {
  return useQuery({
    queryKey: ["fire_event_details", id],
    queryFn: () => getFireEventDetails({ id }),
    enabled: type === "fireevent" && !!id,
  });
};

export const useGetPolicyDetails = ({ id, type }) => {
  return useQuery({
    queryKey: ["policy_details", id],
    queryFn: () => getPolicyDetails({ id }),
    enabled: type === "policy" && !!id,
  });
};

export const useGetProgramDetails = ({ id, type }) => {
  return useQuery({
    queryKey: ["program_details", id],
    queryFn: () => getProgramDetails({ id }),
    enabled: type === "program" && !!id,
  });
};
