import { Axios } from "axios";

export default new Axios({
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  },
});
