import { message } from "antd";
import { AxiosError } from "axios";

export interface serverError {
  message: string;
  statusCode: number;
  error: true | false;
  errors?: {
    errors: Array<{
      type: "field";
      value: string;
      msg: string;
      path: string;
      location: string;
    }>;
  };
}

function handleAxiosError(error: AxiosError<serverError | undefined>) {
  if (error.response?.data) {
    message.error({
      content:
        error.response.data?.message ||
        error?.response.data.errors?.errors?.[0].msg ||
        "Api error",
      ...(error.response.status === 401 && { key: "unauthorized" }),
    });
  } else {
    message.error(error.message);
  }
}

export default handleAxiosError;
