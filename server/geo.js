/**
 * React Dmarc Sift. DAG's 'Get Geo Location' node implementation
 */
'use strict';

const axios = require('axios');
const API_KEY = 'e75109b01d82a76d4bd00a0d1df2fb78'

// Entry point for DAG node
module.exports = async (got) => {
  const data = got.in.data;

  console.log('email-sift-web: geo.js: running...');
  let ips = {}
  for (let i = 0; i < data.length; i++) {
    const message = JSON.parse(data[i].value)
    if (message.ip) {
      try {
        const response = await axios.get(`http://api.ipstack.com/${message.ip}?access_key=${API_KEY}`)
        if (response.status === 200) {
          ips[message.ip] = response.data
        }
      } catch (error) {
        console.log(error.response.body);
      }
    }
  }
  return [
    { name: 'geo', key: 'IPS', value: ips },
  ];
};
