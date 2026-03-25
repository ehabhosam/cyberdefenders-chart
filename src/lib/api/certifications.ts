import certificationsData from "../../data/certifications.json";

import { mockApiWrapper } from "./index";

import { CertificationsApiSuccessResponse } from "../types/api";
import { Certification } from "../types/data";

// fetch cerfiications data, returns a promise that resolves to CertificationsApiSuccessResponse
export function getCertifications(): Promise<CertificationsApiSuccessResponse> {
  return mockApiWrapper(() => ({
    status: "success",
    data: {
      certifications: certificationsData.data as Certification[],
    },
  }));
}
