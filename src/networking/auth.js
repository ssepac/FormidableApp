import axios from "."
import { respond } from "../util";
import { ERROR_GENERIC, ERROR_UNKNOWN_ERROR, NO_ERROR } from "./errors";

export const sendCode = async (email) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/auth`, JSON.stringify({ email }))
    .then((resp) => {
      const parsed = JSON.parse(resp.data)
      if (!parsed.error) return respond(NO_ERROR);
      return respond(ERROR_GENERIC);
    })
    .catch((err) => {
      console.log(err)
      return respond(ERROR_UNKNOWN_ERROR)
    });
};

export const verifyCode = async (code, email) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/auth/token`, JSON.stringify({
      code,
      email,
    }))
    .then((resp) => {
      const parsed = JSON.parse(resp.data)
      if (!parsed.error) return respond(NO_ERROR, parsed.result);
      return respond(ERROR_GENERIC);
    })
    .catch((err) => respond(ERROR_UNKNOWN_ERROR));
};
