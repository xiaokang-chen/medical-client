import network from '../../plugin/network';

export const addSearch = (search) => ({
  type: 'ADD_SEARCH',
  payload: search,
});

export const cleanSearch = () => ({
  type: 'CLEAN_SEARCH',
});

export const searchPatient = (data = {}) => {
  return network('user/patient/search', 'POST', data);
};

export const searchDoctor = (data = {}) => {
  return network('/doctor/search/name', 'POST', data);
};
