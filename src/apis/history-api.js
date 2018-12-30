import axios from 'axios';

const BASE_URL = '/api/v1';

export default {
  async getBossHistories(server) {
    const { data } = await axios.get(`${BASE_URL}/histories/servers/${server}/bosses`);
    return data;
  },
  async saveBossRegenInfo({ 
    sid, wid, fid, channel, time,
  }) {
    await axios.post(`${BASE_URL}/histories/servers/${sid}/bosses`, {
      world: wid,
      field: fid,
      channel,
      time,
    });
  },
};
