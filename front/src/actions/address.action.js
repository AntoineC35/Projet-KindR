import axios from "axios";
import { apiUrl } from "../data/data";

export const CREATE_ADDRESS = "CREATE_ADDRESS";
export const GET_LOCATION = "GET_LOCATION";

export const getLocation = (data) => {
  return (dispatch) => {
    return axios
      .get(
        `https://nominatim.openstreetmap.org/search.php?format=json&postalcode=${data.postal_code}&city=${data.city}&street=${data.address}`
      )
      .then((res) => {
        dispatch({
          type: GET_LOCATION,
          payload: { lat: res.data[0]?.lat, long: res.data[0]?.lon },
        });
        return res.data;
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la localisation :",
          error
        );
        throw error;
      });
  };
};

export const createAddress = (data) => {
  return (dispatch) => {
    return axios
      .post(apiUrl + "create_address", data, { withCredentials: true })
      .then((res) => {
        dispatch({ type: CREATE_ADDRESS, payload: res.data });
      });
  };
};
