import axios from "."
import { respond } from "../util";
import {
  ERROR_NOT_AUTHENTICATED,
  ERROR_MISSING_AUTH_PARAMS,
  ERROR_UNKNOWN_ERROR,
  NO_ERROR,
  ERROR_BAD_REQUEST,
} from "./errors";

export const fetchVideoList = async () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (!token || !email) return respond(ERROR_MISSING_AUTH_PARAMS);

  return axios
    .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/videos/list`, {
      params: {
        token,
        email: encodeURIComponent(email),
      },
    })
    .then(({ data, status }) => {
      const parsed = JSON.parse(data)
      switch (status) {
        case 200: {
          return respond(NO_ERROR, parsed.result);
        }
        case 400:
          return respond(ERROR_BAD_REQUEST);
        case 401: {
          return respond(ERROR_NOT_AUTHENTICATED);
        }
        default: {
          return respond(ERROR_UNKNOWN_ERROR);
        }
      }
    })
    .catch((err) => {
      return respond(ERROR_UNKNOWN_ERROR)
    });
};
