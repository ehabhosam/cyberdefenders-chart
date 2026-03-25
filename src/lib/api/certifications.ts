import { mockApiWrapper } from "./index";
import certificationsData from "../../data/certifications.json";
import { CertificationsApiSuccessResponse } from "../types/api";
import { Certification } from "../types/data";

// fetch cerfiications data, returns
export function getCertifications(): Promise<CertificationsApiSuccessResponse> {
  return mockApiWrapper(() => ({
    status: "success",
    data: {
      certifications: certificationsData.data as Certification[],
    },
  }));
}
