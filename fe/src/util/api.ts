import { qs } from './helper';
import axios from 'axios';

const baseURI = 'https://api.goapi.io/stock/idx';

const apiKey1 = '7ac9bfd9-d395-5f6c-6c20-41ac4243';
const apiKey2 = 'bffbf3f2-5218-5e50-3f36-8c2a21f6';

export async function getData(endpoint: string, query = {}, body = {}, headers = {}) {
  try {
    const url = `${baseURI}/${endpoint}?${qs(query)}`;

    const options = {
      method: 'GET',
      url: url,
      headers: {
        ...headers,
        'X-API-KEY': apiKey2,
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
