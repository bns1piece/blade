import axios from 'axios';

const BASE_URL = '/api/v1';

export default {
  async getBossHistories(sid, wid) {
    const { data } = await axios.get(`${BASE_URL}/histories/servers/${sid}/worlds/${wid}`);
    return data;
  },
  async saveBossRegenInfo({
    sid, wid, fid, channel, time,
  }) {
    await axios.post(`${BASE_URL}/histories/servers/${sid}/worlds/${wid}`, {
      field: fid,
      channel,
      time,
    });
  },
};
