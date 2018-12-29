import axios from 'axios';

const BASE_URL = '/api/v1';

export default {
  async getBossHistories(server) {
    const { data } = await axios.get(`${BASE_URL}/histories/servers/${server}/bosses`);
    return data;
  },
};
