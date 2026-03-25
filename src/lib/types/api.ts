import { Certification } from "./data";

export type CertificationsApiSuccessResponse = {
  status: "success";
  data: {
    certifications: Certification[];
  };
};

export type CertificationsApiErrorResponse = {
  status: "error";
  message: string;
};

export type CertificationsApiResponse =
  | CertificationsApiSuccessResponse
  | CertificationsApiErrorResponse;
