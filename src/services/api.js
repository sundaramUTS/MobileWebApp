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

export const Logout = async () => {
  try {
    let httpService = new HttpServices();
    httpService.URL = NetworkInfo.NETWORK + SubDomain.USEROPERTIONAPI + UserAPI.LOGOUT + `?token=${localStorage.getItem('Token')}`;
    httpService.setAuthRequired = true;
    httpService.setAuthToken = localStorage.getItem('Token');
    let response = await httpService.sendGetRequest();
    return response
  } catch (error) {
    return error
  }
}