import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = (page = 1, status = '') => {
  return axios.get(`${API_URL}/character`, {
    params: {
      page,
      status,
    },
  });
};

export const getCharacterById = (id) => {
  return axios.get(`${API_URL}/character/${id}`);
};

export const getLocation = (url) => {
  return axios.get(url);
};

export const getEpisode = (url) => {
  return axios.get(url);
};

export const getAllCharacters = async (status = '') => {
  let allCharacters = [];
  let nextUrl = `${API_URL}/character?status=${status}`;
  
  while (nextUrl) {
    const response = await axios.get(nextUrl);
    const data = response.data;

    allCharacters = [...allCharacters, ...data.results];

    nextUrl = data.info.next;
  }

  return { data: { results: allCharacters } };
};
