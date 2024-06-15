import { qs } from './helper';
import axios from 'axios';

// const baseURI = 'https://api.goapi.io/stock/idx';
const baseURI = 'http://localhost:5000';


export async function getData(endpoint: string, query = {}, body = {}, headers = {}) {
  try {
    const url = `${baseURI}/${endpoint}?${qs(query)}`;

    const options = {
      method: 'GET',
      url: url,
      headers: {
        ...headers,
      },
      body,
    };
    const response = await axios.request(options);
    
    return response;
  } catch (error) {
    throw error;
    // return error;
  }
}
