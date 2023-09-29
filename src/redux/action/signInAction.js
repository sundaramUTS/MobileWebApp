import { signInRequest } from "../../services/api";

export const signIn = (userReqData) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_USER_DATA_REQUEST' });
    let response = await signInRequest(userReqData);
    dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: response });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_DATA_FAILURE', payload: error.message });
  } finally {
    dispatch({ type: 'FETCH_USER_DATA_COMPLETE' });
  }
};
