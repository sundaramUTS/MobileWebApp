const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  const signInReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_DATA_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_USER_DATA_SUCCESS':
        return { ...state, loading: false, data: action.payload, error: null };
      case 'FETCH_USER_DATA_FAILURE':
        return { ...state, loading: false, data: [], error: action.payload };
      case 'FETCH_USER_DATA_COMPLETE':
        return { ...state, loading: false };
      case 'LOGOUT_USER':{
        return { ...state, data: []}
      }  
      default:
        return state;
    }
  }; 
  
  export default signInReducer;