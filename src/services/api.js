import { NetworkInfo, SubDomain, UserAPI } from "../constants/network";
import { HttpServices } from "./http/http_service";

export const signInRequest = async (userReqData) => {
  try {
    let httpService = new HttpServices();
    httpService.URL = NetworkInfo.NETWORK + SubDomain.USEROPERTIONAPI + UserAPI.LOGIN;
    httpService.dataToSend = userReqData;
    let response = await httpService.sendPostRequest();
    return response;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
}
