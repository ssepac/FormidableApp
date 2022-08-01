import axios from "axios";
import { respond } from "../util";
import { ERROR_GENERIC, ERROR_UNKNOWN_ERROR, NO_ERROR } from "./errors";

export const sendCode = async (email) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth`, { email })
    .then((resp) => {
      if (!resp.error) return respond(NO_ERROR);
      return respond(ERROR_GENERIC);
    })
    .catch((err) => respond(ERROR_UNKNOWN_ERROR));
};

export const verifyCode = async (code, email) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/token`, {
      code,
      email,
    })
    .then((resp) => {
      if (!resp.error) return respond(NO_ERROR, resp.data.result);
      return respond(ERROR_GENERIC);
    })
    .catch((err) => respond(ERROR_UNKNOWN_ERROR));
};
