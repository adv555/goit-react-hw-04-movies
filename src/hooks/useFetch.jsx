/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export function useFetch(callback) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(async () => {
    setLoading(true);

    try {
      const responseData = await callback();
      setData(responseData);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, setData, loading, error };
}

/* ============ */

const API_KEY = `22901299-3a9abb112bfd753d84521cd93`;
const BASE_URL = `https://pixabay.com/api/`;

const fetchData = (searchQuery, page = 1, perPage = 12) => {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

  return fetch(url)
    .then(response => {
      // console.log(searchQuery);
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(
          `no results were found for your search ${this.state.searchQuery}`,
        ),
      ); // если 404
    })
    .then(images => images.hits);
};
export default fetchData;
