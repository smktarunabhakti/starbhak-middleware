import type { number } from "zod";

interface apiResponse {
  success: boolean;
  message?: string;
  data?: object;
  errors?: object;
}

const successResponse = (message?: string, data?: object): apiResponse => {
  const response: apiResponse = {
    success: true,
    message: message || "Berhasil",
  };

  if (data) {
    response.data = data;
  }

  return response;
};

const errorResponse = (message?: string, errors?: object): apiResponse => {
  const response: apiResponse = {
    success: false,
    message: message || "gagal",
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
};

export { successResponse, errorResponse };
