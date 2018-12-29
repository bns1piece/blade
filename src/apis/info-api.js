import axios from 'axios';

const BASE_URL = '/api/v1';

export default {
  async getServers() {
    const { data } = await axios.get(`${BASE_URL}/servers`);
    return data;
  },
  async getWorlds() {
    const { data } = await axios.get(`${BASE_URL}/worlds`);
    return data;
  },
};
