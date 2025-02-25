import { getAddress } from '../../api/address';
import { setAddresses, setLoading, setError } from '../reducers/addressSlice';

export const fetchLocations = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await getAddress();
    dispatch(setAddresses(response.data.locations));
  } catch (error) {
    dispatch(setError(error.message));
  }
};