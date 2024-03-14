import { GET_LOCATION, CREATE_ADDRESS } from "../actions/address.action";

const initialState = {
  csrf_token: "",
  user_id: "",
  address: "",
  postal_code: "",
  city: "",
  location: "",
  sucess: "",
  message: "",
};

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return { ...state, location: action.payload };
    case CREATE_ADDRESS:
      return {
        ...state,
        csrf_token: action.payload?.csrf_token || null,
        address: action.payload?.data.address || null,
        postal_code: action.payload?.data.postal_code || null,
        city: action.payload?.data.city || null,
        success: action.payload?.success || null,
        message: action.payload?.message || null,
      };
    default:
      return state;
  }
}
export const selectSuccess = (state) => state.addressReducer.success;
export const selectLocation = (state) => state.addressReducer.location;
export const selectAddress = (state) => ({
  user_id: state.addressReducer.user_id,
  csrf_token: state.addressReducer.csrf_token,
  address: state.addressReducer.address,
  postal_code: state.addressReducer.postal_code,
  city: state.addressReducer.city,
  location: state.addressReducer.location,
});
