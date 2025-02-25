import axios from 'axios'
import api from './baseApi'

export const cashKey = '/addresses'

export async function addAddress(data) {
  return api.post('user/locations', data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export async function getAddress() {
    return await api.get('user/locations', {
      headers : {
        'Content-Type' : 'application/json',
      }
    })
}

export async function deleteLocationRequest(id) {
  return api.delete(`user/locations/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function getLocationByID(id) {
  return api.get(`user/locations/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function updateLocationByID(id, data) {
  return api.put(`user/locations/${id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function changeLocationStatus(id) {
  return api.put(`user/location/${id}/change`, null, {
    headers: {
      Accept : 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export async function getCountries() {
  return api.get('get-country', {
    headers : {
      'Content-Type' : 'application/json',
    }
  })
}


export async function searchForLocation(location, language = 'ar') {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${location}&format=json`,
      {
        params: {
          countrycodes: 'EG',
          viewbox: '24.6981,31.6689,36.8947,22.0000', // Egypt bounding coordinates
          bounded: 1 // Restrict results to the bounding box
        },
        headers: {
          'Accept-Language': language, // Dynamic language based on user preference
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error('Failed to fetch location data');
  }
}