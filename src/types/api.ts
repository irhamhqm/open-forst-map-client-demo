import { SilvanusCoord } from "./geo";

export interface Payload {
  type: "Feature";
  properties: {
    frequency: "daily" | "monthly" | "yearly";
    daterange?: string; // "1551400215:1646115534";
    datetime?: string;
  };
  geometry: {
    type: string | "Polygon";
    coordinates: SilvanusCoord[][];
    pilot: string; //"indonesia";
  };
}

export interface BioDiversityIndexPayload extends Payload {}

export interface BioDiversityIndexResponse {
  data: [
    {
      datetime: string;
      evenness: number;
      fire_events: Array<{
        datetime: string;
        fire_event: string;
        name: string;
      }>;
      policies: Array<{ datetime: string; policie: string; name: string }>;
      programs: Array<{ datetime: string; program: string; name: string }>;
      shannon_index: number;
    }
  ];
  meta: {
    count: number;
    end: string;
    start: string;
  };
  status: boolean;
}

export interface ContinuousMonitoringPayload extends Payload {
  properties: {
    frequency: "daily" | "monthly" | "yearly";
    variables: string[];
    daterange?: string;
    datetime?: string;
  };
}

export interface ContinuousMonitoringResponse {
  data: [
    {
      datetime: string;
      fcd?: number;
      fire_events: Array<{
        datetime: string;
        fire_event: string;
        name: string;
      }>;
      policies: Array<{ datetime: string; policie: string; name: string }>;
      programs: Array<{ datetime: string; program: string; name: string }>;
      gdp?: number;
      nbr?: number;
      ndvi?: number;
      popdens?: number;
      soil_types?: number;
      t2m?: number;
      tp?: number;
    }
  ];
  meta: {
    count: number;
    end: string;
    start: string;
  };
  status: boolean;
}

export interface EcologicalResiliencePayload extends Payload {}

export interface EcologicalResilienceResponse {
  data: [
    {
      datetime: string;
      fire_events: Array<{
        datetime: string;
        fire_event: string;
        name: string;
      }>;
      policies: Array<{ datetime: string; policie: string; name: string }>;
      programs: Array<{ datetime: string; program: string; name: string }>;
      ndvi: number;
    }
  ];
  meta: {
    count: number;
    end: string;
    start: string;
  };
  status: boolean;
}

export interface EcologicalResilienceDetailsResponse {
  data: {
    ecological_resilience: {
      D: number;
      Mal: number;
      R: number;
      T: number;
    };
    ndvi_data: [
      {
        datetime: string;
        ndvi: number;
      }
    ];
  };
  meta: {
    bad_ndvi: number;
    bad_ndvi_date: string;
    fire_event_date: string;
    good_ndvi: number;
    good_ndvi_date: string;
    recover_ndvi: number;
    recover_ndvi_date: string;
  };
  status: boolean;
}

export interface PolicyDetailsResponse {
  brief: string;
  document: string;
  name: string;
  policy_id: string;
  translate?: string;
}

export interface ProgramDetailsReponse {
  budget: number;
  document: string;
  name: string;
  program_id: string;
  scope: string;
}

export interface FireEventDetailsResponse {
  fire_event_id: string;
  size: number;
  value: number;
}

// export interface GetFileReponse {

// }
